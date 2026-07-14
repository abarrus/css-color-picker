import cssColors from 'css-color-names';
import { closest } from 'color-diff';

type RGB = Record<'R'|'G'|'B', number>;

function rgbCssColors() {
    const colors: RGB[] = [];
    Object.keys(cssColors).forEach((key: string) => {
        const hex = cssColors[key as keyof typeof cssColors];
        colors.push(hexToRgb(hex));
    })
    return colors;
}

function hexToRgb(hex: string) {
    const hexStr = hex.toString();
    const red = hexStr.slice(1,3);
    const green = hexStr.slice(3,5);
    const blue = hexStr.slice(5,7);
    return {
        R: parseInt(red, 16),
        G: parseInt(green, 16),
        B: parseInt(blue, 16)
    }
}

function rgbToHex(rgb: RGB) {
    let hexStr = "#";
    (["R","G","B"] as const).forEach(c => {
        hexStr += rgb[c].toString(16).padStart(2, "0");
    })
    return hexStr;
}

// give the color to compare to and the remaining colors to look at;
// it will return the named CSS color
function getClosestColor(color: RGB, palette: RGB[]) {
    const closestRgb = closest(color, palette);
    return closestRgb !== undefined ? palette.indexOf(closestRgb) : -1;
}

// either hex or css color, turns it to hex
function toHex(color: string) {
    return color in cssColors ?
        cssColors[color as keyof typeof cssColors]
        : color;
}

// give a hex code, get a list of CSS color names
export function getClosestColors(ogColor: string, count: number) {
    // color name to hex code if needed
    const color = toHex(ogColor);

    const res = [];
    const rgbColor = hexToRgb(color);
    const palette = rgbCssColors();
    const paletteNames = Object.keys(cssColors);
    
    for (let i = 0; i < count; i++) {
        const index = getClosestColor(rgbColor, palette);
        if (index !== -1) {
            const colorName = paletteNames[index];
            palette.splice(index, 1);
            paletteNames.splice(index, 1);
            if (colorName === ogColor) {
                i--;
                continue;
            }
            res.push(colorName);
        } else {
            break;
        }
    }

    return res;
}