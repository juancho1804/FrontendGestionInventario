import axiosClient from "../api/axiosClient";

export const fetchCategories = async () => {
    const response = await axiosClient.get("/categories");
    return response.data;
};