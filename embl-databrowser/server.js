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
const contrastThreshold = 4.5; // WCAG recommended ratio

// Convert hex color to RGB
function hexToRgb(hex: string): [number, number, number] {
    // Normalize 3-digit hex to 6-digit hex
    if (hex.length === 4) {
        hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [0, 0, 0];
}

// Calculate luminance
function luminance(r: number, g: number, b: number): number {
    const [rr, gg, bb] = [r, g, b].map(v => v / 255).map(v =>
        v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
}

// Calculate contrast ratio
function contrastRatio(fg: [number, number, number], bg: [number, number, number]): number {
    const lum1 = luminance(fg[0], fg[1], fg[2]) + 0.05;
    const lum2 = luminance(bg[0], bg[1], bg[2]) + 0.05;
    return lum1 > lum2 ? lum1 / lum2 : lum2 / lum1;
}

// Convert RGB to hex
function rgbToHex(rgb: [number, number, number]): string {
    return `#${rgb.map(v => {
        const hex = Math.round(v).toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }).join('')}`;
}

// Generate HSL color variations
function generateColorVariations(color: string): string[] {
    const [r, g, b] = hexToRgb(color);
    const hsl = rgbToHsl(r, g, b);
    const variations = [];

    for (let i = -60; i <= 60; i += 30) { // Adjust hue by -60, -30, 0, 30, 60 degrees
        const h = (hsl[0] + i + 360) % 360; // Wrap around the hue
        const s = hsl[1];
        const l = Math.min(Math.max(hsl[2] + (i > 0 ? -0.1 : 0.1), 0), 1); // Slightly adjust lightness
        variations.push(hslToRgb(h, s, l));
    }

    return variations.map(rgbToHex);
}

// Convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break; // Red is max
            case g: h = (b - r) / d + 2; break; // Green is max
            case b: h = (r - g) / d + 4; break; // Blue is max
        }
        h /= 6; // Normalize to [0, 1]
    }
    
    // Convert h from [0, 1] to [0, 360]
    return [h * 360, s, l];
}

// Convert HSL to RGB
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    let r, g, b;

    if (s === 0) { // achromatic
        r = g = b = l * 255; 
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h / 360 + 1 / 3);
        g = hue2rgb(p, q, h / 360);
        b = hue2rgb(p, q, h / 360 - 1 / 3);
    }
    return [r * 255, g * 255, b * 255];
}

// Get a range of contrasting colors
export function getContrastingColors(color: string): string[] {
    const backgroundColor = hexToRgb(color);
    const contrastRatios: { color: string; ratio: number }[] = [];

    // Generate color variations based on the selected color
    const colorVariations = generateColorVariations(color);
    
    for (const hexColor of colorVariations) {
        const rgbColor = hexToRgb(hexColor);
        const contrast = contrastRatio(backgroundColor, rgbColor);
        if (contrast >= contrastThreshold) {
            contrastRatios.push({ color: hexColor, ratio: contrast });
        }
    }

    // Sort colors by contrast ratio in descending order
    contrastRatios.sort((a, b) => b.ratio - a.ratio);
    
    return contrastRatios.slice(0, 3).map(cr => cr.color);
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
import { getContrastingColors, hexToRgb } from './colorUtils';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.recommendContrastColor', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found.');
            return;
        }

        const document = editor.document;
        const selection = editor.selection;
        const selectedText = document.getText(selection).trim();

        // Check if the selected text is a valid color (hex only)
        if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(selectedText)) {
            const contrastingColors = getContrastingColors(selectedText);
            if (contrastingColors.length > 0) {
                vscode.window.showInformationMessage(`Recommended contrasting colors: ${contrastingColors.join(', ')}`);
            } else {
                vscode.window.showInformationMessage('No contrasting colors found.');
            }
        } else {
            vscode.window.showWarningMessage('Selected text is not a valid hex color.');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}


*/
