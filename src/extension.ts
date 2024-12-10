import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

function createWebViewPanel(extensionUri: vscode.Uri, panel: any) {
  const scriptPathOnDisk = vscode.Uri.joinPath(
    extensionUri,
    "out",
    "react",
    "assets",
    "index.js"
  );

  const StylePathOnDisl = vscode.Uri.joinPath(
    extensionUri,
    "out",
    "react",
    "assets",
    "index.css"
  );

  // Convert to a webview-friendly URI
  const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);
  const styleUri = panel.webview.asWebviewUri(StylePathOnDisl);

  // Set the webview content
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>YAML Generator</title>
        <script>
        const vscode = acquireVsCodeApi();
        window.addEventListener("message", (event) => {
          // Handle incoming messages from the extension here
          const { command, yaml } = event.data;
          if (command === "updateYaml") {
            console.log("Received YAML data in React app:", yaml);
            // You can update your React state or perform other actions here
          }
        });
      </script>
      <script type="module" crossorigin src="${scriptUri.toString()}"></script>
        <link rel="stylesheet" crossorigin href="${styleUri.toString()}">
    </head>
    <body>
      <div id="root"></div>
    </body>
    </html>
  `;
}

export function activate(context: vscode.ExtensionContext) {
  const extensionUri = context.extensionUri;
  console.log("Extension is activated!");

  const disposable = vscode.commands.registerCommand(
    "yaml-generator-ampersand.openPreview",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "yamlPreview",
        "YAML Preview", // Title of the panel
        vscode.ViewColumn.One, // Show in the first column
        {
          enableScripts: true,
        }
      );
      panel.webview.html = createWebViewPanel(extensionUri, panel);
    }
  );

  // Register the sidegar view with icon
  console.log("Registering YAML Generator View");

  const yamlGeneratorView = vscode.window.registerWebviewViewProvider(
    "yaml-generator-ampersand", // Ensure this EXACTLY matches package.json
    {
      resolveWebviewView(webviewView) {
        console.log("Webview view resolved"); // Add logging

        const panel = webviewView.webview;
        panel.options = {
          enableScripts: true,
        };

        try {
          panel.html = createWebViewPanel(context.extensionUri, panel);
          console.log("Webview HTML set successfully");
        } catch (error) {
          console.error("Error setting webview HTML:", error);
        }
      },
    },
    {
      webviewOptions: {
        retainContextWhenHidden: true, // Consider adding this
      },
    }
  );

  // Register the context menu item for YAML files

  context.subscriptions.push(disposable, yamlGeneratorView);
  const contextMenuDisposable = vscode.commands.registerCommand(
    "yaml-generator-ampersand.openInYamlGenerator",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document.languageId === "yaml") {
        const filePath = editor.document.uri.fsPath;
        console.log("Opening file in YAML Generator:", filePath);

        let fileContent = "";
        try {
          fileContent = fs.readFileSync(filePath, "utf-8");
        } catch (error) {
          console.error("Error reading file:", error);
          vscode.window.showErrorMessage(`Error reading file: ${error}`);
          return;
        }

        console.log("File content:", fileContent);

        const panel = vscode.window.createWebviewPanel(
          "yamlPreview",
          "YAML Preview", // Title of the panel
          vscode.ViewColumn.One, // Show in the first column
          {
            enableScripts: true,
          }
        );

        panel.webview.html = createWebViewPanel(extensionUri, panel);

        panel.webview.onDidReceiveMessage((message) => {
          console.log("Received message from webview:", message);
          if (message.command === "requestFileData") {
            panel.webview.postMessage({
              yaml: fileContent,
            });
          }

          if (message.command === "updateYaml") {
            const yaml = message.yaml;
            try {
              fs.writeFileSync(filePath, yaml, "utf-8");
              vscode.window.showInformationMessage(
                "YAML file updated successfully!"
              );
            } catch (error) {
              console.error("Error writing file:", error);
              vscode.window.showErrorMessage("Error updating file");
            }
          }

          if (message.command === "closeExtension") {
            panel.dispose();
          }
        });

        panel.webview.postMessage({
          command: "updateYaml",
          yaml: fileContent,
        });

        // vscode.commands.executeCommand("yaml-generator-ampersand.openPreview");
      }
    }
  );

  context.subscriptions.push(contextMenuDisposable);
}
