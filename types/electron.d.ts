export {};

declare global {
  interface Window {
    electron: {
      onThemeChanged: (callback: (isDark: boolean) => void) => void;
      getCurrentTheme: () => Promise<boolean>;
    };
  }
}
