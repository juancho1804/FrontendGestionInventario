const API_URL = "http://localhost:8001/products";

export async function addProductApi(productData) {
    const formData = new FormData();
    formData.append("categoryId",productData.categoryId)
    formData.append("color", productData.color)
    formData.append("brandId", productData.brandId)
    formData.append("price", productData.price)
    formData.append("image", productData.image)


    formData.append("productVariantRequest", JSON.stringify({variants:productData.variants}));


    const response = await fetch(API_URL,{
        method : "POST",
        body : formData

    });

    if(!response.ok){
        throw new Error("Error al guardar el producto");
    }

    return response.json();

    
}

export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/${id}`,{
        method : "DELETE",
    });

    if(!response.ok){
        throw new Error("Error al eliminar el producto");
    }
    return true;
    
}