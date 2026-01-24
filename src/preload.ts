import { contextBridge, ipcRenderer } from "electron";
import {
  EVENT_GET_DIRECTORY_NAME,
  EVENT_OPEN_DIRECTORY_DIALOG,
  EVENT_OPEN_FILE_DIALOG,
  EVENT_THEME_CHANGED,
} from "./ipc";

// Backend API定義
contextBridge.exposeInMainWorld("electron", {
  // テーマ検知
  onThemeChanged: (callback: (isDark: boolean) => void) => {
    ipcRenderer.on(EVENT_THEME_CHANGED, (_event, isDark) => callback(isDark));
  },
  // ファイル選択
  openFileDialog: (): Promise<string[]> =>
    ipcRenderer.invoke(EVENT_OPEN_FILE_DIALOG),
  // ディレクトリ選択
  openDirectoryDialog: (isInput: boolean): Promise<string[]> =>
    ipcRenderer.invoke(EVENT_OPEN_DIRECTORY_DIALOG, isInput),
  // ディレクトリ名取得
  getDirFullPath: (filePath: string): Promise<string> =>
    ipcRenderer.invoke(EVENT_GET_DIRECTORY_NAME, filePath),
});
