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
    const index = palette.findIndex(
        (val) => {
            return (["R", "G", "B"] as const).reduce((prev, c) => {
                return prev && val[c] === closestRgb[c]
            }, true)
        }
    );
    const closestHex = rgbToHex(closestRgb);
    const closestName = Object.keys(cssColors).find((name) => {
        return closestHex === cssColors[name as keyof typeof cssColors];
    });
    return {
        name: closestName,
        index
    };
}

// give a hex code, get a list of CSS color names
export function getClosestColors(color: string, count: number) {
    const res = [];
    const rgbColor = hexToRgb(color);
    const palette = rgbCssColors();
    
    for (let i = 0; i < count; i++) {
        const { name, index } = getClosestColor(rgbColor, palette);
        if (name) {
            palette.splice(index, 1);
            res.push(name);
        } else {
            break;
        }
    }

    return res;
}