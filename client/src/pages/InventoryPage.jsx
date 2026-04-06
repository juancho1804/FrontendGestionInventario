import Header from "../components/Header";
import FilterMenu from "../components/FilterMenu";
import ProductList from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";
import AddProductFormModal from "../components/AddProductFormModal";
import { useState, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCategories } from "../hooks/useCategories";

export default function InventoryPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);

  const { categories } = useCategories();

  // IDs de categorías filtradas por género
  const genderCategoryIds = useMemo(() => {
    if (!selectedGender) return [];
    return categories
      .filter(c => c.gender === selectedGender)
      .map(c => c.id);
  }, [selectedGender, categories]);

  // Combina categorías del FilterPanel con las del género
  // Si hay género activo pero el usuario también eligió categorías del panel,
  // la intersección evita mostrar categorías de otro género
  const effectiveCategoryIds = useMemo(() => {
    if (selectedGender && selectedCategories.length > 0) {
      // solo las categorías del panel que pertenecen al género seleccionado
      return selectedCategories.filter(id => genderCategoryIds.includes(id));
    }
    if (selectedGender) return genderCategoryIds;
    return selectedCategories;
  }, [selectedGender, selectedCategories, genderCategoryIds]);

  const { products, loadProducts, deleteProduct } = useProducts(
    effectiveCategoryIds,
    selectedBrands,
    selectedSizes
  );

  const [productToEdit, setProductToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (product) => { setProductToEdit(product); setShowModal(true); };
  const handleAdd = () => { setProductToEdit(null); setShowModal(true); };

  const handleFiltersChange = ({ categories, brands, sizes }) => {
    setSelectedCategories(categories);
    setSelectedBrands(brands);
    setSelectedSizes(sizes);
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setSelectedCategories([]); // limpia categorías del panel al cambiar género
    setSelectedBrands([]);
    setSelectedSizes([]);

  };

  const { user } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";

  return (
    <>
      <Header
        onGenderChange={handleGenderChange}
        selectedGender={selectedGender}
      />

      <div className="main-content">
        <FilterMenu
          showAddButton={isAdmin}
          onAdd={handleAdd}
          onFiltersChange={handleFiltersChange}
          selectedGender={selectedGender}
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