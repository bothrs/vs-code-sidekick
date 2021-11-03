import { Uri, workspace } from "vscode";

export const createFileWithContents = async (uri: Uri, content: string) => {
  const existingFile = await workspace.fs.stat(uri).then(
    (value) => value,
    () => {}
  );

  if (existingFile) {
    return;
  }

  await workspace.fs.writeFile(uri, Buffer.from(content));
};
