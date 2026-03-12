import Header from "../components/Header";
import FilterMenu from "../components/filterMenu";
import ProductList from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";
import Sidebar from "../components/Sidebar";
import AddProductButton from "../components/addProductButton";

export default function InventoryPage() {
  const { products } = useProducts();

  return (
    <>
      <Header />
      <Sidebar></Sidebar>

      <div className="main-content">
        <FilterMenu showAddButton = {true}/>

        <ProductList products={products} />
      </div>
    </>
  );
}
