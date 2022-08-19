import { workspace, commands, window } from 'vscode'

import { createComponent } from './modules/createComponent/services'
import { getCommandFramework } from './modules/createComponent/utils/framework'
import { getStylesLibrary } from './modules/createComponent/utils/stylesLibrary'
import { ExtensionConfig } from './types/configuration'

import type { ExtensionContext, Uri } from 'vscode'

// This method is called when your extension is activated
export function activate(context: ExtensionContext) {
  const config = workspace.getConfiguration()

  const extensionConfig: ExtensionConfig = config.bothrs

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = commands.registerCommand(
    'bothrs-sidekick.createComponentAtFolder',
    async (folderUri?: Uri) => {
      try {
        const clickedFolderPath = folderUri?.path

        if (!clickedFolderPath) {
          return
        }

        const framework = await getCommandFramework(
          clickedFolderPath,
          extensionConfig
        )
        const stylesLibrary = await getStylesLibrary(
          clickedFolderPath,
          extensionConfig
        )

        const componentName = await window.showInputBox()
        if (!componentName) {
          return
        }

        const createdFilePath = await createComponent(
          clickedFolderPath,
          componentName,
          framework,
          stylesLibrary
        )

        if (createdFilePath && extensionConfig.shouldOpenCreatedComponentFile) {
          window.showTextDocument(createdFilePath)
        }
      } catch (e) {
        const error = e as Error

        window.showErrorMessage(error.message)
      }
    }
  )

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log('Bothrs Sidekick is hanging up the cape.')
}
