'use strict';

import * as vscode from 'vscode';
import { TextEditor, ViewColumn } from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.navigateToTest', () => {
        let currentFile = vscode.window.activeTextEditor.document.fileName;
        let targetFile = null;

        if (currentFile.endsWith('.ts')) {
            if (currentFile.includes('.spec')) {
                targetFile = currentFile.replace(".spec.ts", ".ts")
            } else {
                targetFile = currentFile.replace(".ts", ".spec.ts");
            }

            let existingEditor: TextEditor = null;
            let existingColumn : ViewColumn = null;

            vscode.window.visibleTextEditors.forEach((editor) => {
                if (editor.document.fileName == targetFile) {
                    existingEditor = editor;
                    existingColumn = editor.viewColumn;
                }
            })

            if (existingEditor == null) {
                vscode.workspace.openTextDocument(targetFile).then((textDocument)=> {
                    vscode.window.showTextDocument(textDocument, vscode.ViewColumn.One);                    
                });
            } else {
                vscode.workspace.openTextDocument(targetFile).then((textDocument)=> {
                    vscode.window.showTextDocument(textDocument, existingColumn);                    
                })
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {

}