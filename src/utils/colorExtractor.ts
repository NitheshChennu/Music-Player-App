import { FastAverageColor } from 'fast-average-color';

const fac = new FastAverageColor();

export const extractColors = async (imageUrl: string): Promise<string> => {
  try {
    const color = await fac.getColorAsync(imageUrl);
    return `linear-gradient(180deg, ${color.hex} 0%, #121212 100%)`;
  } catch (error) {
    console.error('Error extracting color:', error);
    return 'linear-gradient(180deg, #535353 0%, #121212 100%)';
  }
};