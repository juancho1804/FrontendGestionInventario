import axiosClient from "../api/axiosClient";

export const fetchBrands = async () => {
    const response = await axiosClient.get("/brands");
    return response.data;
};


export const addBrandApi = async (brand) => {
    const response = await axiosClient.post("/brands", brand);
    return response.data;
};

export const deleteBrandApi = async (brandId) => {
    const response = await axiosClient.delete(`/brands/${brandId}`);
    return response.data;
};