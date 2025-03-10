import { colors } from '../tokens/colors';

/**
 * Type for color shades
 */
export type ColorShade = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

/**
 * Type for color names
 */
export type ColorName = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray';

/**
 * Get a color from the color palette
 * @param colorName The base color name
 * @param shade The shade of the color (100-900)
 * @returns The color hex code
 */
export const getColor = (colorName: ColorName, shade: ColorShade = 600): string => {
  const colorKey = `${colorName}${shade}` as keyof typeof colors;
  return colors[colorKey] || colors.primary600; // Default to primary if not found
};

/**
 * Generate a custom color palette based on a hex color
 * @param baseColor The base color in hex format
 * @returns An object with shades of the color
 */
export const generateColorPalette = (baseColor: string) => {
  // This is a simplified version - in a real app you might use a library like chroma.js
  // to generate proper color palettes with correct lightness/darkness ratios
  
  // For now, we'll just return a mock palette
  return {
    100: adjustBrightness(baseColor, 80),
    200: adjustBrightness(baseColor, 60),
    300: adjustBrightness(baseColor, 40),
    400: adjustBrightness(baseColor, 20),
    500: baseColor,
    600: adjustBrightness(baseColor, -20),
    700: adjustBrightness(baseColor, -40),
    800: adjustBrightness(baseColor, -60),
    900: adjustBrightness(baseColor, -80),
  };
};

/**
 * Adjust the brightness of a hex color
 * @param hex The hex color
 * @param percent The percentage to adjust (-100 to 100)
 * @returns The adjusted hex color
 */
function adjustBrightness(hex: string, percent: number): string {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex color
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  // Adjust brightness
  r = Math.min(255, Math.max(0, r + (percent / 100) * 255));
  g = Math.min(255, Math.max(0, g + (percent / 100) * 255));
  b = Math.min(255, Math.max(0, b + (percent / 100) * 255));
  
  // Convert back to hex
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
} 