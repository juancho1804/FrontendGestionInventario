import axiosClient from "../api/axiosClient";

export const fetchBrands = async () => {
    const response = await axiosClient.get("/brands");
    return response.data;
};