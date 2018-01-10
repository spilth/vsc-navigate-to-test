'use strict';

import * as vscode from 'vscode';
import { TextEditor, ViewColumn } from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.navigateToTest', () => {
        let currentFileName = vscode.window.activeTextEditor.document.fileName;
        let currentColumn = vscode.window.activeTextEditor.viewColumn;

        let targetFileName = null;
        let targetColumn = vscode.ViewColumn.One;

        if (currentFileName.endsWith('.ts')) {
            if (currentFileName.includes('.spec')) {
                targetFileName = currentFileName.replace(".spec.ts", ".ts")
            } else {
                targetFileName = currentFileName.replace(".ts", ".spec.ts");
            }

            if (currentColumn == vscode.ViewColumn.One) {
                targetColumn = vscode.ViewColumn.Two;
            }

            let existingEditor: TextEditor = null;
            let existingColumn : ViewColumn = null;

            vscode.window.visibleTextEditors.forEach((editor) => {
                if (editor.document.fileName == targetFileName) {
                    existingEditor = editor;
                    existingColumn = editor.viewColumn;
                }
            })

            if (existingEditor == null) {
                vscode.workspace.openTextDocument(targetFileName).then((textDocument)=> {
                    vscode.window.showTextDocument(textDocument, targetColumn);
                });
            } else {
                vscode.workspace.openTextDocument(targetFileName).then((textDocument)=> {
                    vscode.window.showTextDocument(textDocument, existingColumn);
                })
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {

}