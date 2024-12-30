import { Route, Routes } from "react-router-dom";
import "./App.css";
import "../src/css/style.css";
import "../src/css/style-prefix.css";
import SubCategorySection from "./components/SubCategorySection";
import NavBar from "./components/NavBar";
import FooterSection from "./components/FooterSection";
import HomePage from "./Pages/HomePage";
import AddToCartPage from "./Pages/AddToCartPage";
import MyOrderPage from "./Pages/MyOrderPage";
import ProfilePage from "./Pages/ProfilePage";
// import RelevantSection from "./components/RelevantSection";
import ProductDetailPage from "./Pages/ProductDetailPage";
import MyOrdersPage from "./Pages/MyOrderPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/sub/:category" element={<SubCategorySection />} />
        <Route exact path="/Add" element={<AddToCartPage />} />
        <Route exact path="/myOrder" element={<MyOrderPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        {/* <Route exact path="/relevant" element={<RelevantSection />} /> */}
        <Route exact path="/detail" element={<ProductDetailPage />} />
        <Route exact path="/add" element={<AddToCartPage />} />
        <Route exact path="/orders" element={<MyOrdersPage />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
      <FooterSection />
    </>
  );
}

export default App;
