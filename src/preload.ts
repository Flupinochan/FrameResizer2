import { contextBridge, ipcRenderer } from "electron";
import { EVENT_THEME_CHANGED } from "./ipc";

// テーマ検知
contextBridge.exposeInMainWorld("electron", {
  onThemeChanged: (callback: (isDark: boolean) => void) => {
    ipcRenderer.on(EVENT_THEME_CHANGED, (_event, isDark) => callback(isDark));
  },
});
