import Header from "../components/Header";
import FilterMenu from "../components/filterMenu";
import ProductList from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";
import Sidebar from "../components/Sidebar";
import AddProductFormModal from "../components/addProductFormModal";

export default function InventoryPage() {
  const { products } = useProducts();

  return (
    <>
      <Header />


      <div className="main-content">
        <FilterMenu showAddButton={true} />
        <ProductList products={products} />
      </div>

      <AddProductFormModal />   {/* ← FALTA ESTO */}
    </>
  );
}
