import { contextBridge, ipcRenderer } from "electron";
import {
  EXEC_CONVERT_IMAGES,
  EXTRACT_DIR_NAME_FROM_PATH,
  OPEN_DIR_DIALOG,
  OPEN_DIR_DIALOG_FOR_IMAGES,
  OPEN_FILE_DIALOG_FOR_IMAGES,
  THEME_CHANGED,
} from "./ipc";
import { ConvertBatchRequest } from "./main";

// Backend API定義
contextBridge.exposeInMainWorld("electron", {
  // テーマ検知
  onThemeChanged: (callback: (isDark: boolean) => void) => {
    ipcRenderer.on(THEME_CHANGED, (_event, isDark) => callback(isDark));
  },
  // ファイル選択し画像一覧を取得
  openFileDialogForImages: (): Promise<string[]> =>
    ipcRenderer.invoke(OPEN_FILE_DIALOG_FOR_IMAGES),
  // ディレクトリ選択し画像一覧を取得
  openDirDialogForImages: (): Promise<string[]> =>
    ipcRenderer.invoke(OPEN_DIR_DIALOG_FOR_IMAGES),
  // ディレクトリ名取得
  extractDirNameFromPath: (filePath: string): Promise<string> =>
    ipcRenderer.invoke(EXTRACT_DIR_NAME_FROM_PATH, filePath),
  // ディレクトリ選択しディレクトリパスを取得
  openDirDialog: (): Promise<string> => ipcRenderer.invoke(OPEN_DIR_DIALOG),
  // 画像処理実行
  execConvertImages: (request: ConvertBatchRequest) =>
    ipcRenderer.invoke(EXEC_CONVERT_IMAGES, request),
});
