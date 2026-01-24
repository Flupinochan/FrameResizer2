import path from "path";

export class PathHandler {
  private readonly fullPath: string;

  constructor(fullPath: string) {
    this.fullPath = path.resolve(fullPath);
  }

  get directoryName(): string {
    return path.dirname(this.fullPath);
  }

  get fileName(): string {
    return path.basename(this.fullPath);
  }
}
