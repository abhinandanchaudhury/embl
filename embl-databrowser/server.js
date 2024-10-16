const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
app.use(require('express-status-monitor')({
  title: 'EMBL Data Browser Statistics',
  path: '/api/status',
  healthChecks: [{
    protocol: 'http',
    host: '0.0.0.0',
    path: '/api/health',
    port: port
  }]
  }));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/health', function (req, res) {
 return res.send('UP');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => console.log(`Listening on port ${port}`));

/*
const contrastThreshold = 4.5;  // WCAG recommended ratio

// Check if the selected text is a valid color (hex, rgb, etc.)
export function isValidColor(color: string): boolean {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    return hexRegex.test(color) || rgbRegex.test(color);
}

// Convert hex color to RGB
function hexToRgb(hex: string): [number, number, number] {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [0, 0, 0];
}

// Calculate luminance
function luminance(r: number, g: number, b: number): number {
    let [rr, gg, bb] = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
}

// Calculate contrast ratio between two colors
function contrastRatio(fg: [number, number, number], bg: [number, number, number]): number {
    const lum1 = luminance(fg[0], fg[1], fg[2]) + 0.05;
    const lum2 = luminance(bg[0], bg[1], bg[2]) + 0.05;
    return lum1 > lum2 ? lum1 / lum2 : lum2 / lum1;
}

// Get contrasting color (black or white) based on background color
export function getContrastingColor(color: string): string {
    const backgroundColor = hexToRgb(color);

    // Contrast against black and white
    const whiteContrast = contrastRatio(backgroundColor, [255, 255, 255]);
    const blackContrast = contrastRatio(backgroundColor, [0, 0, 0]);

    return whiteContrast >= contrastThreshold ? '#FFFFFF' : '#000000';
}


"contributes": {
    "commands": [
        {
            "command": "extension.recommendContrastColor",
            "title": "Recommend Contrast Color"
        }
    ],
    "keybindings": [
        {
            "command": "extension.recommendContrastColor",
            "key": "ctrl+shift+c",
            "when": "editorTextFocus"
        }
    ]
}

import * as vscode from 'vscode';
import { getContrastingColor, isValidColor } from './colorUtils';

export function activate(context: vscode.ExtensionContext) {
    // Register the command
    let disposable = vscode.commands.registerCommand('extension.recommendContrastColor', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const selection = editor.selection;
        const selectedText = document.getText(selection);

        // Check if the selected text is a valid color (hex, RGB, etc.)
        if (isValidColor(selectedText)) {
            const contrastingColor = getContrastingColor(selectedText);
            vscode.window.showInformationMessage(`Recommended contrasting color: ${contrastingColor}`);
        } else {
            vscode.window.showWarningMessage('Selected text is not a valid color.');
        }
    });

    context.subscriptions.push(disposable);
}

// Deactivate the extension
export function deactivate() {}

*/
