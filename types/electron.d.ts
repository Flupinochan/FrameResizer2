export {};

declare global {
  interface Window {
    electron: {
      onThemeChanged: (callback: (isDark: boolean) => void) => void;
      openFileDialogForImages: () => Promise<string[]>;
      openDirDialogForImages: () => Promise<string[]>;
      extractDirNameFromPath: (filePath: string) => Promise<string>;
      openDirDialog: () => Promise<string>;
    };
  }
}
