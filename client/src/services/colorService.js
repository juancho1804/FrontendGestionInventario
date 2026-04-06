import { fetchColors } from "../data/colorsApi";
export const getColors = async () => {
  const colors = await fetchColors();
  return colors;
};