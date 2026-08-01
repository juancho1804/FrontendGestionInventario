import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import ProductPage from "./pages/ProductPage";
import CategoryManagementPage from "./pages/CategoryManagementPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/categories" element={<CategoryManagementPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;