import ProductList from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";

export default function InventoryPage(){
  const {products} = useProducts();

  return (
    <ProductList products={products}></ProductList>
  )
}