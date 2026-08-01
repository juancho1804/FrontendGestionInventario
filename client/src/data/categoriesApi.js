import axiosClient from "../api/axiosClient";

export const fetchCategories = async () => {
    const response = await axiosClient.get("/categories");
    return response.data;
};

export const saveCategoryApi = async (categoryData)=>{
    const response = await axiosClient.post("/categories", categoryData);
    return response.data;
};

export const deleteCategoryApi = async (categoryId)=>{
    const response = await axiosClient.delete(`/categories/${categoryId}`);
    return response.data;
};

export const editCategoryApi = async (categoryId,categoryData)=>{
    const response = await axiosClient.put(`/categories/${categoryId}`, categoryData);
    return response.data;
};