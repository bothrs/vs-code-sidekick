import { workspace } from 'vscode'

import { ExtensionConfig, Framework } from '../../../types/configuration'

import { getNearestPackageJson } from './fs'

export const getCommandFramework = async (
  commandDirectoryPath: string,
  extensionConfig: ExtensionConfig
) => {
  if (extensionConfig.framework) {
    return extensionConfig.framework
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

    if (allDependencies['react-native']) {
      return Framework.ReactNative
    } else if (allDependencies.react) {
      return Framework.React
    }
  }

  throw new Error(
    "Bothrs Sidekick can't figure out the framework and there was no fallback configured"
  )
}
