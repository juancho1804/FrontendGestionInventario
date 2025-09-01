const API_URL = "http://localhost:8001/categories";

export async function getCategoriesApi() {
    const response = await fetch(API_URL);

    if(!response.ok){
        throw new Error("Error al cargar las categorías");
    }
    return response.json();
    
}