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
function getContrastColors(hex: string, step: number = 10, colors: string[] = []): string[] {
    // Remove the hash at the start if it's there
    hex = hex.replace('#', '');

    // Parse r, g, b values
    let r: number, g: number, b: number;
    if (hex.length === 3) {
        r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
        g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
        b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else {
        throw new Error('Invalid HEX color.');
    }

    // Helper function to calculate relative luminance
    function getLuminance(r: number, g: number, b: number): number {
        const [R, G, B] = [r, g, b].map((value) => {
            const normalized = value / 255;
            return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }

    // Function to calculate contrast ratio
    function getContrastRatio(luminance1: number, luminance2: number): number {
        return (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
    }

    const originalLuminance = getLuminance(r, g, b);

    // Adjust RGB values and calculate contrast recursively
    function adjustColor(r: number, g: number, b: number, step: number): string {
        const newR = (r + step) % 256;
        const newG = (g + step) % 256;
        const newB = (b + step) % 256;

        const newLuminance = getLuminance(newR, newG, newB);
        const contrastRatio = getContrastRatio(originalLuminance, newLuminance);

        if (contrastRatio >= 7.0) {
            const toHex = (value: number) => value.toString(16).padStart(2, '0');
            return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
        }
        return adjustColor(newR, newG, newB, step + 10); // Recursive adjustment
    }

    // Keep finding new colors until we have 3
    while (colors.length < 3) {
        const newColor = adjustColor(r, g, b, step);
        if (!colors.includes(newColor)) {
            colors.push(newColor);
        }
        step += 10; // Adjust step for the next color
    }

    return colors;
}


*/
