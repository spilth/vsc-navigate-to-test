'use strict';

import * as vscode from 'vscode';
import { TextEditor, ViewColumn } from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.navigateToTest', () => {
        let currentFile = vscode.window.activeTextEditor.document.fileName;

        if (currentFile.endsWith('.ts')) {
            if (currentFile.includes('.spec')) {
                let implementationFile = currentFile.replace(".spec.ts", ".ts")
                
                let alreadyOpen = false;
                let exisitingEditor: TextEditor = null;
                let existingColumn : ViewColumn = null;

                vscode.window.visibleTextEditors.forEach((editor) => {
                    if (editor.document.fileName == implementationFile) {
                        console.log(editor.document.fileName);
                        alreadyOpen = true;
                        exisitingEditor = editor;
                        existingColumn = editor.viewColumn;
                    }
                })

                if (!alreadyOpen) {
                    vscode.workspace.openTextDocument(implementationFile).then((textDocument)=> {
                        vscode.window.showTextDocument(textDocument, vscode.ViewColumn.One);                    
                    });
                } else {
                    vscode.workspace.openTextDocument(implementationFile).then((textDocument)=> {
                        vscode.window.showTextDocument(textDocument, existingColumn);                    
                    })
                }
            } else {
                let testFile = currentFile.replace(".ts", ".spec.ts");

                let alreadyOpen = false;
                let exisitingEditor: TextEditor = null;
                let existingColumn : ViewColumn = null;

                vscode.window.visibleTextEditors.forEach((editor) => {
                    if (editor.document.fileName == testFile) {
                        console.log(editor.document.fileName);

                        alreadyOpen = true;
                        exisitingEditor = editor;
                        existingColumn = editor.viewColumn;
                    }
                })

                if (!alreadyOpen) {
                    vscode.workspace.openTextDocument(testFile).then((textDocument)=> {
                        vscode.window.showTextDocument(textDocument, vscode.ViewColumn.One);                    
                    })
                } else {
                    vscode.workspace.openTextDocument(testFile).then((textDocument)=> {
                        vscode.window.showTextDocument(textDocument, existingColumn);                    
                    })
                }
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {

}