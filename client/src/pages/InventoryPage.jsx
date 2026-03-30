import Header from "../components/Header";
import FilterMenu from "../components/FilterMenu";
import ProductList from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";
import Sidebar from "../components/Sidebar";
import AddProductFormModal from "../components/AddProductFormModal";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function InventoryPage() {

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const { products, loadProducts, deleteProduct } = useProducts(selectedCategories, selectedBrands, selectedSizes);

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
  const handleFiltersChange = ({ categories, brands, sizes }) => {
    setSelectedCategories(categories);
    setSelectedBrands(brands);
    setSelectedSizes(sizes);
    // useProducts se re-ejecuta automáticamente porque cambian sus dependencias
  };

  const {user} = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";



  return (
    <>
      <Header />

      <div className="main-content">
        <FilterMenu
          showAddButton={isAdmin}
          onAdd={handleAdd}
          onFiltersChange={handleFiltersChange}
        />
        <ProductList
          products={products}
          onDelete={deleteProduct}
          onEdit={handleEdit}
          isAdmin={isAdmin}
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