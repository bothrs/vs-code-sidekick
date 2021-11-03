import * as vscode from "vscode";
import { createComponent } from "./modules/createComponent";
import { ExtensionConfig } from "./types/configuration";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "bothrs-assistant" is now active!'
  );

  const config = vscode.workspace.getConfiguration();

  const extensionConfig: ExtensionConfig = config.bothrs;

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "bothrs-assistant.createComponentAtFolder",
    async (folderUri?: vscode.Uri) => {
      const clickedFolderPath = folderUri?.path;

      if (!clickedFolderPath) {
        return;
      }

      vscode.window.showInputBox().then((componentName) => {
        if (!componentName) {
          return;
        }

        createComponent(
          clickedFolderPath,
          componentName,
          extensionConfig.framework,
          extensionConfig.productTeam
        );
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
