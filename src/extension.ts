import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const extensionUri = context.extensionUri;
  console.log("Extension is activated!");

  const disposable = vscode.commands.registerCommand(
    "yaml-generator-ampersand.openPreview",
    () => {
      // Create the webview panel
      const panel = vscode.window.createWebviewPanel(
        "yamlPreview", // ID of the webview panel
        "YAML Preview", // Title of the panel
        vscode.ViewColumn.One, // Show in the first column
        {
          enableScripts: true,
          //   localResourceRoots: [vscode.Uri.joinPath(extensionUri, "src")],
        }
      );

      // Resolve script URI here
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
      panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>YAML Generator</title>
          <script type="module" crossorigin src="${scriptUri.toString()}"></script>
            <link rel="stylesheet" crossorigin href="${styleUri.toString()}">
        </head>
        <body>
          <div id="root"></div>
        </body>
        </html>
      `;
    }
  );

  context.subscriptions.push(disposable);
}
//
