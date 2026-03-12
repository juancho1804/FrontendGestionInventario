import { fetchCategories} from "../data/categoriesApi";

export const getCategories = async() => {
    const categories = await fetchCategories();
    return categories;
};