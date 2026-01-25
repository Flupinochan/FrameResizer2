import { rename, unlink } from "fs/promises";
import path from "path";
import sharp from "sharp";

export interface ImageConversionSettings {
  outputHeight?: number;
  outputWidth?: number;
  borderSize?: number;
  borderColor?: string;
}

export interface ICustomizeImage {
  convert(sourceImagePath: string, outputImagePath: string): Promise<void>;
}

export class CustomizeImage implements ICustomizeImage {
  private readonly outputHeight: number;
  private readonly outputWidth: number;
  private readonly borderSize: number;
  private readonly borderColor?: string;

  constructor(settings: ImageConversionSettings) {
    this.outputHeight = settings.outputHeight ?? 0;
    this.outputWidth = settings.outputWidth ?? 0;
    this.borderSize = settings.borderSize ?? 0;
    this.borderColor = settings.borderColor;
  }

  async convert(
    sourceImagePath: string,
    outputImagePath: string,
  ): Promise<void> {
    const samePath =
      path.resolve(sourceImagePath) === path.resolve(outputImagePath);

    const actualOutputPath = samePath
      ? outputImagePath + ".tmp"
      : outputImagePath;

    const hasResize = this.outputHeight > 0 || this.outputWidth > 0;
    const hasBorder = this.borderSize > 0 && this.borderColor !== undefined;

    if (hasResize && hasBorder) {
      await this.convertWithResizeAndBorder(sourceImagePath, actualOutputPath);
    } else if (hasResize) {
      await this.convertWithResizeOnly(sourceImagePath, actualOutputPath);
    } else if (hasBorder) {
      await this.convertWithBorderOnly(sourceImagePath, actualOutputPath);
    }

    // sharpでは上書きできないため既存ファイルを削除し、リネームする方法で上書き
    if (samePath) {
      await unlink(sourceImagePath);
      await rename(actualOutputPath, sourceImagePath);
    }
  }

  private async convertWithResizeAndBorder(
    sourceImagePath: string,
    outputImagePath: string,
  ): Promise<void> {
    const image = sharp(sourceImagePath);
    const metadata = await image.metadata();

    const { width: resizeWidth, height: resizeHeight } =
      this.calculateResizeSize(metadata.width!, metadata.height!);

    // borderSize分、画像を小さくする
    const innerWidth = resizeWidth - this.borderSize * 2;
    const innerHeight = resizeHeight - this.borderSize * 2;

    await sharp(sourceImagePath)
      .resize(innerWidth, innerHeight, { fit: "fill" })
      .extend({
        top: this.borderSize,
        bottom: this.borderSize,
        left: this.borderSize,
        right: this.borderSize,
        background: this.borderColor,
      })
      .toFile(outputImagePath);
  }

  private async convertWithResizeOnly(
    sourceImagePath: string,
    outputImagePath: string,
  ): Promise<void> {
    const image = sharp(sourceImagePath);
    const metadata = await image.metadata();

    const { width: resizeWidth, height: resizeHeight } =
      this.calculateResizeSize(metadata.width!, metadata.height!);

    await sharp(sourceImagePath)
      .resize(resizeWidth, resizeHeight, { fit: "fill" })
      .toFile(outputImagePath);
  }

  private async convertWithBorderOnly(
    sourceImagePath: string,
    outputImagePath: string,
  ): Promise<void> {
    await sharp(sourceImagePath)
      .extend({
        top: this.borderSize,
        bottom: this.borderSize,
        left: this.borderSize,
        right: this.borderSize,
        background: this.borderColor,
      })
      .toFile(outputImagePath);
  }

  private calculateResizeSize(
    originalWidth: number,
    originalHeight: number,
  ): { width: number; height: number } {
    const aspectRatio = originalWidth / originalHeight;

    let width = this.outputWidth;
    let height = this.outputHeight;

    if (this.outputWidth > 0) {
      height = Math.round(this.outputWidth / aspectRatio);
    } else {
      width = Math.round(this.outputHeight * aspectRatio);
    }

    return { width, height };
  }
}
