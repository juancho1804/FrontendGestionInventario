import Header from "../components/Header";
import FilterMenu from "../components/FilterMenu";
import ProductList from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";
import AddProductFormModal from "../components/AddProductFormModal";
import { useState, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCategories } from "../hooks/useCategories";
import { useSearchParams } from "react-router-dom";

export default function InventoryPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [filterResetKey, setFilterResetKey] = useState(0);
  const [searchParams] = useSearchParams();
  const [selectedGender, setSelectedGender] = useState(
    searchParams.get("gender") || null,
  );

  const handleCategorySelect = (gender, categoryId) => {
    setSelectedGender(gender);
    setSelectedCategories([categoryId]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setMinPrice(null);
    setMaxPrice(null);
    setFilterResetKey((k) => k + 1);
  };

  const { categories } = useCategories();

  // IDs de categorías filtradas por género
  const genderCategoryIds = useMemo(() => {
    if (!selectedGender) return [];
    return categories
      .filter((c) => c.gender === selectedGender)
      .map((c) => c.id);
  }, [selectedGender, categories]);

  // Combina categorías del FilterPanel con las del género
  // Si hay género activo pero el usuario también eligió categorías del panel,
  // la intersección evita mostrar categorías de otro género
  const effectiveCategoryIds = useMemo(() => {
    if (selectedGender && selectedCategories.length > 0) {
      // solo las categorías del panel que pertenecen al género seleccionado
      return selectedCategories.filter((id) => genderCategoryIds.includes(id));
    }
    if (selectedGender) return genderCategoryIds;
    return selectedCategories;
  }, [selectedGender, selectedCategories, genderCategoryIds]);

  const { products, loadProducts, deleteProduct } = useProducts(
    effectiveCategoryIds,
    selectedBrands,
    selectedSizes,
    minPrice,
    maxPrice,
  );

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

  const handleFiltersChange = ({ brands, sizes, minPrice, maxPrice }) => {
    setSelectedBrands(brands);
    setSelectedSizes(sizes);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setSelectedCategories([]); // limpia categorías del panel al cambiar género
    setSelectedBrands([]);
    setSelectedSizes([]);
    setMinPrice(null);
    setMaxPrice(null);
    setFilterResetKey((k) => k + 1);
  };

  const { user } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";

  return (
    <>
      <Header
        onGenderChange={handleGenderChange}
        onCategorySelect={handleCategorySelect}
        selectedGender={selectedGender}
      />

      <div className="main-content">
        <FilterMenu
          showAddButton={isAdmin}
          onAdd={handleAdd}
          onFiltersChange={handleFiltersChange}
          resetKey={filterResetKey}
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
