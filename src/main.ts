import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  nativeTheme,
  OpenDialogOptions,
} from "electron";
import started from "electron-squirrel-startup";
import fs from "fs";
import path from "node:path";
import {
  EXEC_CONVERT_IMAGES,
  EXTRACT_DIR_NAME_FROM_PATH,
  OPEN_DIR_DIALOG,
  OPEN_DIR_DIALOG_FOR_IMAGES,
  OPEN_FILE_DIALOG_FOR_IMAGES,
  THEME_CHANGED,
} from "./ipc";
import {
  CustomizeImage,
  ImageConversionSettings,
} from "./services/CustomiseImage";

let mainWindow: BrowserWindow | null = null;
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png"];

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // テーマ初期化通知
  mainWindow.webContents.on("did-finish-load", () => updateTheme());

  // 開発環境の場合のみDevToolsを開く
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  // テーマ設定
  nativeTheme.themeSource = "system";

  createWindow();

  // テーマ変更を通知
  nativeTheme.on("updated", () => updateTheme());
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function updateTheme() {
  mainWindow?.webContents.send(THEME_CHANGED, nativeTheme.shouldUseDarkColors);
}

/**
 * ファイル選択
 * そのまま選択したファイルパス一覧を返却
 */
ipcMain.handle(
  OPEN_FILE_DIALOG_FOR_IMAGES,
  async (_event): Promise<string[]> => {
    if (!mainWindow) return [];

    const options = {
      title: "Select Images",
      buttonLabel: "Select",
      defaultPath: app.getPath("desktop"),
      properties: ["openFile", "multiSelections"],
      filters: [
        { name: "Image", extensions: IMAGE_EXTENSIONS },
        { name: "All Files", extensions: ["*"] },
      ],
    } satisfies OpenDialogOptions;

    const result = await dialog.showOpenDialog(mainWindow, options);
    return result.canceled ? [] : result.filePaths;
  },
);

/**
 * ディレクトリ選択
 * 選択したディレクトリ配下の画像ファイルのパス一覧を返却
 */
ipcMain.handle(
  OPEN_DIR_DIALOG_FOR_IMAGES,
  async (_event): Promise<string[]> => {
    if (!mainWindow) return [];

    const options = {
      title: "Select Directory",
      buttonLabel: "Select",
      defaultPath: app.getPath("desktop"),
      properties: ["openDirectory"],
    } satisfies OpenDialogOptions;

    const result = await dialog.showOpenDialog(mainWindow, options);
    if (result.canceled) return [];

    const dirPath = result.filePaths[0];
    const files = await fs.promises.readdir(dirPath);

    return files
      .filter((file) =>
        IMAGE_EXTENSIONS.includes(path.extname(file).slice(1).toLowerCase()),
      )
      .map((file) => path.join(dirPath, file));
  },
);

ipcMain.handle(OPEN_DIR_DIALOG, async (_event): Promise<string> => {
  if (!mainWindow) return "";

  const options = {
    title: "Select Directory",
    buttonLabel: "Select",
    defaultPath: app.getPath("desktop"),
    properties: ["openDirectory"],
  } satisfies OpenDialogOptions;

  const result = await dialog.showOpenDialog(mainWindow, options);
  if (result.canceled) return "";

  return result.filePaths[0];
});

/**
 * ディレクトリパスを返却
 */
ipcMain.handle(
  EXTRACT_DIR_NAME_FROM_PATH,
  async (_event, filePath: string): Promise<string> => {
    const fullPath = path.resolve(filePath);
    return path.dirname(fullPath);
  },
);

/**
 * 画像処理実行
 */
export interface ConvertBatchRequest {
  sourceImagePaths: string[];
  outputDirectoryPath: string;
  outputHeight?: number;
  outputWidth?: number;
  borderSize?: number;
  borderColor?: string;
}

ipcMain.handle(
  EXEC_CONVERT_IMAGES,
  async (_event, req: ConvertBatchRequest): Promise<void> => {
    const inputPaths = req.sourceImagePaths;
    const outputDirPath = req.outputDirectoryPath;
    const settings: ImageConversionSettings = {
      outputHeight: req.outputHeight,
      outputWidth: req.outputWidth,
      borderSize: req.borderSize,
      borderColor: req.borderColor,
    };

    const customizeImage = new CustomizeImage(settings);

    for (const inputPath of inputPaths) {
      const outputFilePath = path.join(outputDirPath, path.basename(inputPath));
      await customizeImage.convert(inputPath, outputFilePath);
    }
  },
);
