import { fetchSizes } from "../data/sizesApi"

export const getSizes = async() => {
    const sizes = await fetchSizes();
    return sizes.map(s =>({id:s.id, name:s.size}));

};