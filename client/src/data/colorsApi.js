import axiosClient from "../api/axiosClient";

export const fetchColors = async () => {
    const response = await axiosClient.get("/colors");
    return response.data;
};