import { fetchBrands, addBrandApi, deleteBrandApi } from "../data/brandsApi";
export const getBrands = async () => {
  const brands = await fetchBrands();
  return brands.map(b =>({ id: b.id, name : b.brand}));
};

export const addBrand = async (name) => {
    return await addBrandApi({brand:name});
};

export const deleteBrand = async (brandId) => {
    return await deleteBrandApi(brandId);
};