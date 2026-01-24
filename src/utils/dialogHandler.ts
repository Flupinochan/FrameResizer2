/**
 * 入力ファイル選択 or 入力フォルダ選択 用template method pattern
 * 異なる処理部分を引数(関数)で受け取る
 * @param openDialog openFileDialog() or openDirectoryDialog()
 * @param inputPathsStore
 * @param outputPathsStore
 * @returns
 */
export async function handleOpenPathDialog<
  InputStore extends { clear: () => void; addPaths: (paths: string[]) => void },
  OutputStore extends {
    isInputOutputSame: boolean;
    setPath: (path: string) => void;
  },
>(
  openDialog: () => Promise<string[]>,
  inputPathsStore: InputStore,
  outputPathsStore: OutputStore,
) {
  // open dialog
  const inputImagePaths = await openDialog();
  if (inputImagePaths.length === 0) return;

  // set input paths
  inputPathsStore.clear();
  inputPathsStore.addPaths(inputImagePaths);

  // is input directory same as output directory?
  if (!outputPathsStore.isInputOutputSame) return;

  // set output path
  const outputDirFullPath = await window.electron.getDirFullPath(
    inputImagePaths[0],
  );
  outputPathsStore.setPath(outputDirFullPath);
}
