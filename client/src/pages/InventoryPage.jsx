import Header from "../components/Header";
import FilterMenu from "../components/FilterMenu";
import ProductList from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";
import Sidebar from "../components/Sidebar";
import AddProductFormModal from "../components/AddProductFormModal";
import { useState } from "react";

export default function InventoryPage() {

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const { products, loadProducts, deleteProduct } = useProducts(selectedCategories, selectedBrands);

  const [productToEdit, setProductToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (product) => {
    setProductToEdit(product);
    setShowModal(true);
  };

  const handleAdd = () => {
    setProductToEdit(null);
    setShowModal(true);
  };

  // Recibe { categories: [1,3], brands: [2] } desde FilterMenu
  const handleFiltersChange = ({ categories, brands }) => {
    setSelectedCategories(categories);
    setSelectedBrands(brands);
    // useProducts se re-ejecuta automáticamente porque cambian sus dependencias
  };

  return (
    <>
      <Header />

      <div className="main-content">
        <FilterMenu
          showAddButton={true}
          onAdd={handleAdd}
          onFiltersChange={handleFiltersChange}
        />
        <ProductList
          products={products}
          onDelete={deleteProduct}
          onEdit={handleEdit}
        />
      </div>

      {showModal && (
        <AddProductFormModal
          product={productToEdit}
          onSuccess={() => {
            loadProducts();
            setShowModal(false);
            setProductToEdit(null);
          }}
          onClose={() => {
            setShowModal(false);
            setProductToEdit(null);
          }}
        />
      )}
    </>
  );
}