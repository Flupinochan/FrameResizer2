/**
 * 入力ファイル選択 or 入力フォルダ選択 用template method pattern
 * 異なる処理部分を引数(関数)で受け取る
 * @param openDialog openFileDialog() or openDirectoryDialog()
 * @param inputPathsStore
 * @param outputPathsStore
 * @returns
 */
export async function handleOpenPathDialog<
  InputStore extends { paths: string[] },
  OutputStore extends { path: string; isInputOutputSame: boolean },
>(
  openDialog: () => Promise<string[]>,
  inputPathsStore: InputStore,
  outputPathsStore: OutputStore,
) {
  // open dialog
  const inputImagePaths = await openDialog();
  if (inputImagePaths.length === 0) return;

  // set input paths
  inputPathsStore.paths = [];
  inputPathsStore.paths.push(...inputImagePaths);

  // is input directory same as output directory?
  if (!outputPathsStore.isInputOutputSame) return;

  // set output path
  const outputDirFullPath = await window.electron.extractDirNameFromPath(
    inputImagePaths[0],
  );
  outputPathsStore.path = outputDirFullPath;
}
