import { workspace, Uri } from 'vscode'

import { Framework } from '../../../types/configuration'
import barrelTemplateFileName from '../templates/barrel.mustache'
import componentTemplateFileName from '../templates/component.mustache'
import stylesTemplateFileName from '../templates/styles.mustache'
import { createFileWithContents, kebabCase } from '../utils'

const createReactOrReactNativeComponent = async (
  componentDirectoryPath: string,
  componentName: string,
  framework: Framework.React | Framework.ReactNative
) => {
  const componentUri = Uri.file(
    `${componentDirectoryPath}/${componentName}.tsx`
  )
  const componentTemplateUri = Uri.file(
    `${__dirname}/${componentTemplateFileName}`
  )
  const componentPromise = createFileWithContents(
    componentUri,
    componentTemplateUri,
    {
      componentName,
      overWriteStylesPropDefinition:
        framework === Framework.ReactNative
          ? 'style?: StyleProp<ViewStyle>'
          : 'className?: string',
      reactNativeTypesImport: Framework.ReactNative
        ? `\nimport type { StyleProp, ViewStyle } from 'react-native'\n`
        : '',
    }
  )

  const stylesUri = Uri.file(
    `${componentDirectoryPath}/${componentName}.styled.tsx`
  )
  const stylesTemplateUri = Uri.file(`${__dirname}/${stylesTemplateFileName}`)
  const stylesPromise = await createFileWithContents(
    stylesUri,
    stylesTemplateUri,
    {
      nativeExtension: framework === Framework.ReactNative ? '/native' : '',
      containerComponent: framework === Framework.ReactNative ? 'View' : 'div',
    }
  )

  const barrelUri = Uri.file(`${componentDirectoryPath}/index.ts`)
  const barrelTemplateUri = Uri.file(`${__dirname}/${barrelTemplateFileName}`)
  const barrelPromise = await createFileWithContents(
    barrelUri,
    barrelTemplateUri,
    {
      componentName,
    }
  )

  await Promise.all([componentPromise, stylesPromise, barrelPromise])

  return componentUri
}

export const createComponent = async (
  commandPath: string,
  componentName: string,
  framework: Framework
): Promise<Uri | void> => {
  const sanitizedComponentName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1)

  const componentFolderName = kebabCase(sanitizedComponentName)

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
