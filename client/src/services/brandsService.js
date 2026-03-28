import { fetchBrands } from "../data/brandsApi";
export const getBrands = async () => {
  const brands = await fetchBrands();
  return brands.map(b =>({ id: b.id, name : b.brand}));
};