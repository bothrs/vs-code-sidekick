import { workspace, Uri } from 'vscode'

import { Framework } from '../../../types/configuration'
import {
  generatePropsInterface,
  generateStyledComponentsImport,
  generateStyledFileImport,
  REACT_IMPORT,
  generateStyledComponent,
  createFileWithContents,
} from '../utils'

const createReactOrReactNativeComponent = async (
  componentDirectoryPath: string,
  componentName: string,
  framework: Framework.React | Framework.ReactNative
) => {
  const componentUri = Uri.file(
    `${componentDirectoryPath}/${componentName}.tsx`
  )

  const styledComponentsUri = Uri.file(
    `${componentDirectoryPath}/${componentName}.style.tsx`
  )

  const componentPropsUri = Uri.file(
    `${componentDirectoryPath}/${componentName}.props.tsx`
  )

  const barrelUri = Uri.file(`${componentDirectoryPath}/index.ts`)

  await createFileWithContents(
    componentUri,
    `${REACT_IMPORT}\n\n` +
      `${generateStyledFileImport(componentName)}\n` +
      `${generatePropsInterface()}\n\n` +
      `export const ${componentName}: FC<Props> = ({ children, style, className }) => {\n` +
      `  return <StyledContainer>{children}</StyledContainer>\n` +
      `}\n`
  )

  await createFileWithContents(
    styledComponentsUri,
    `${generateStyledComponentsImport(framework)}\n\n` +
      `export ${generateStyledComponent(framework)}\n`
  )

  await createFileWithContents(
    componentPropsUri,
    `export ${generatePropsInterface()}\n`
  )

  await createFileWithContents(
    barrelUri,
    `export * from './${componentName}'\n`
  )

  return componentUri
}

export const createComponent = async (
  commandPath: string,
  componentName: string,
  framework: Framework
): Promise<Uri | void> => {
  const sanitizedComponentName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1)

  const componentFolderName: string =
    sanitizedComponentName.charAt(0).toLowerCase() +
    sanitizedComponentName.slice(1)

  const componentFolderUri = Uri.file(`${commandPath}/${componentFolderName}`)

  await workspace.fs.createDirectory(componentFolderUri)

  if (framework === Framework.React || framework === Framework.ReactNative) {
    return createReactOrReactNativeComponent(
      componentFolderUri.path,
      sanitizedComponentName,
      framework
    )
  }
}
