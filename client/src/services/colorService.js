import { fetchColors, addColorApi, deleteColorApi } from "../data/colorsApi";
export const getColors = async () => {
  const colors = await fetchColors();
  return colors;
};

export const addColor = async (colorData) => {
    return await addColorApi(colorData);
};

export const deleteColor = async (colorId) => {
    return await deleteColorApi(colorId);
};
