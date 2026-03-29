import axiosClient from "../api/axiosClient";

export const fetchSizes = async () => {
    const response = await axiosClient.get("/sizes");
    return response.data;
};