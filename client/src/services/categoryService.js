import { deleteCategoryApi, editCategoryApi, fetchCategories, saveCategoryApi } from "../data/categoriesApi";

export const getCategories = async () => {
  const categories = await fetchCategories();
  return categories;
};

export const addCategory = async (categoryData) =>{
  return await saveCategoryApi(categoryData);
}

export const editCategory = async (idCategory,categoryData) =>{
  return await editCategoryApi(idCategory,categoryData);
}

export const deleteCategory = async(idCategory)=>{
  return await deleteCategoryApi(idCategory);
}
