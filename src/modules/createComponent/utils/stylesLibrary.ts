import { workspace } from 'vscode'

import { ExtensionConfig, StylesLibrary } from '../../../types/configuration'

import { getNearestPackageJson } from './fs'

export const getStylesLibrary = async (
  commandDirectoryPath: string,
  extensionConfig: ExtensionConfig
) => {
  if (extensionConfig.stylesLibrary !== StylesLibrary.Automatic) {
    return extensionConfig.stylesLibrary
  }

  if (workspace?.workspaceFolders?.[0]) {
    const packageJson = await getNearestPackageJson(
      workspace?.workspaceFolders[0].uri.path,
      commandDirectoryPath
    )

    const allDependencies: Record<string, unknown> = {
      ...(packageJson?.dependencies as Record<string, unknown>),
      ...(packageJson?.devDependencies as Record<string, unknown>),
      ...(packageJson?.peerDependencies as Record<string, unknown>),
    }

    if (allDependencies.tailwindcss) {
      return StylesLibrary.Tailwind
    } else if (allDependencies['styled-components']) {
      return StylesLibrary.StyledComponents
    }
  }

  return StylesLibrary.CSS
}
