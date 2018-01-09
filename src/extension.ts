'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.navigateToTest', () => {
        let currentFile = vscode.window.activeTextEditor.document.fileName;

        if (currentFile.endsWith('.ts')) {
            if (currentFile.includes('.spec')) {
                let implementationFile = currentFile.replace(".spec.ts", ".ts")

                vscode.workspace.openTextDocument(implementationFile).then((textDocument)=> {
                    vscode.window.showTextDocument(textDocument, vscode.ViewColumn.One);                    
                });
            } else {
                let testFile = currentFile.replace(".ts", ".spec.ts");

                vscode.workspace.openTextDocument(testFile).then((textDocument)=> {
                    vscode.window.showTextDocument(textDocument, vscode.ViewColumn.One);                    
                })
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {

}