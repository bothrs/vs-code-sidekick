import { workspace, Uri } from 'vscode'

import { Framework, StylesLibrary } from '../../../types/configuration'
import barrelTemplateFileName from '../templates/barrel.mustache'
import componentStyledTemplateFileName from '../templates/component.styled.mustache'
import componentTailwindTemplateFileName from '../templates/component.tailwind.mustache'
import stylesStyledTemplateFileName from '../templates/styles.styled.mustache'
import { createFileWithContents, kebabCase } from '../utils'

const createReactOrReactNativeStyledComponent = async (
  componentDirectoryPath: string,
  componentName: string,
  framework: Framework.React | Framework.ReactNative
) => {
  const componentUri = Uri.file(
    `${componentDirectoryPath}/${componentName}.tsx`
  )
  const componentTemplateUri = Uri.file(
    `${__dirname}/${componentStyledTemplateFileName}`
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
  const stylesTemplateUri = Uri.file(
    `${__dirname}/${stylesStyledTemplateFileName}`
  )
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

const createReactTailwindComponent = async (
  componentDirectoryPath: string,
  componentName: string
) => {
  const componentUri = Uri.file(
    `${componentDirectoryPath}/${componentName}.tsx`
  )
  const componentTemplateUri = Uri.file(
    `${__dirname}/${componentTailwindTemplateFileName}`
  )
  const componentPromise = createFileWithContents(
    componentUri,
    componentTemplateUri,
    {
      componentName,
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

  await Promise.all([componentPromise, barrelPromise])

  return componentUri
}

export const createComponent = async (
  commandPath: string,
  componentName: string,
  framework: Framework,
  stylesLibrary: StylesLibrary
): Promise<Uri | void> => {
  const sanitizedComponentName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1)

  const componentFolderName = kebabCase(sanitizedComponentName)

  const componentFolderUri = Uri.file(`${commandPath}/${componentFolderName}`)

  await workspace.fs.createDirectory(componentFolderUri)

  console.log(stylesLibrary, framework)

  if (
    (framework === Framework.React || framework === Framework.ReactNative) &&
    stylesLibrary === StylesLibrary.StyledComponents
  ) {
    return await createReactOrReactNativeStyledComponent(
      componentFolderUri.path,
      sanitizedComponentName,
      framework
    )
  }
  if (
    framework === Framework.React &&
    stylesLibrary === StylesLibrary.Tailwind
  ) {
    return await createReactTailwindComponent(
      componentFolderUri.path,
      sanitizedComponentName
    )
  }
}
