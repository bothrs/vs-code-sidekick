import { Uri, workspace } from 'vscode'

export const createFileWithContents = async (uri: Uri, content: string) => {
  const existingFile = await workspace.fs.stat(uri).then(
    (value) => value,
    () => undefined
  )

  if (existingFile) {
    return
  }

  await workspace.fs.writeFile(uri, Buffer.from(content))
}

export const getNearestPackageJson = async (
  rootDirectoryPath: string,
  startDirectoryPath: string
): Promise<Record<string, unknown>> => {
  const packageJsonUri = Uri.file(`${startDirectoryPath}/package.json`)

  const packageJsonContents = await workspace.fs.readFile(packageJsonUri).then(
    (value) => value,
    () => undefined
  )

  if (packageJsonContents) {
    return JSON.parse(packageJsonContents.toString())
  } else if (rootDirectoryPath !== startDirectoryPath) {
    const parentDirectoryPath = startDirectoryPath
      .split('/')
      .slice(0, -1)
      .join('/')

    return await getNearestPackageJson(rootDirectoryPath, parentDirectoryPath)
  }

  return {}
}
