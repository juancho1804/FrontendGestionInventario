import InventoryPage from "./pages/InventoryPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <InventoryPage />
    <ToastContainer
    position="top-right"
    autoClose={3000}
    />
    </>
  );
}

export default App;