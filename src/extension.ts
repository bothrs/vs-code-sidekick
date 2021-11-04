import { workspace, commands, window } from "vscode";
import type { ExtensionContext, Uri } from "vscode";
import { createComponent } from "./modules/createComponent";
import { ExtensionConfig } from "./types/configuration";

// This method is called when your extension is activated
export function activate(context: ExtensionContext) {
  const config = workspace.getConfiguration();

  const extensionConfig: ExtensionConfig = config.bothrs;

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = commands.registerCommand(
    "bothrs-sidekick.createComponentAtFolder",
    async (folderUri?: Uri) => {
      const clickedFolderPath = folderUri?.path;

      if (!clickedFolderPath) {
        return;
      }

      window.showInputBox().then(async (componentName) => {
        if (!componentName) {
          return;
        }

        const createdFilePath = await createComponent(
          clickedFolderPath,
          componentName,
          extensionConfig.framework,
          extensionConfig.productTeam
        );

        if (createdFilePath && extensionConfig.shouldOpenCreatedComponentFile) {
          window.showTextDocument(createdFilePath);
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
