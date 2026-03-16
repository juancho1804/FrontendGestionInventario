import Header from "../components/Header";
import FilterMenu from "../components/FilterMenu";
import ProductList from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";
import Sidebar from "../components/Sidebar";
import AddProductFormModal from "../components/AddProductFormModal";
import { useState } from "react";

export default function InventoryPage() {
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { products, loadProducts, deleteProduct } =
    useProducts(selectedCategory);
  const [productToEdit, setProductToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (product) => {
    setProductToEdit(product);
    setShowModal(true); // abre el modal
  };

  const handleAdd = () => {
    setProductToEdit(null);
    setShowModal(true); // abrir modal para nuevo producto
  };

  return (
    <>
      <Header />

      <div className="main-content">
        <FilterMenu
          showAddButton={true}
          onAdd={handleAdd}
          onCategoryChange={setSelectedCategory}
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
