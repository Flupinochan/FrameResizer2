export {};

declare global {
  interface Window {
    electron: {
      onThemeChanged: (callback: (isDark: boolean) => void) => void;
      openFileDialog: () => Promise<string[]>;
      openDirectoryDialog: (isInput: boolean) => Promise<string[]>;
      getDirFullPath: (filePath: string) => Promise<string>;
    };
  }
}
