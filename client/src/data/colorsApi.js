import axiosClient from "../api/axiosClient";

export const fetchColors = async () => {
    const response = await axiosClient.get("/colors");
    return response.data;
};

export const addColorApi = async (colorData) => {
    const response = await axiosClient.post("/colors", colorData);
    return response.data;
};

export const deleteColorApi = async (colorId) => {
    const response = await axiosClient.delete(`/colors/${colorId}`);
    return response.data;
};