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
import BillingPage from "./Pages/BillingPage";
import OrderDetailPage from "./Pages/OrderDetailPage";
import SearchResults from "./components/SearchResults";
import SignUpPage from "./Pages/SignUpPage";
import ForgetPassword from "./Pages/ForgetPassword";
import EmailVerifyPage from "./Pages/EmailVerifyPage";

function App() {
  const tokenData = localStorage.getItem("tokenData");
  const token = JSON.parse(tokenData);
  return (
    <>
      {token?.length > 5 ? (
        <>
          <NavBar />
          <Routes>
            <Route exact path="*" element={<HomePage />} />
            <Route exact path="/" element={<HomePage />} />
            <Route
              exact
              path="/sub/:category"
              element={<SubCategorySection />}
            />
            <Route exact path="/myOrder" element={<MyOrderPage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/detail/:id" element={<ProductDetailPage />} />
            <Route exact path="/add" element={<AddToCartPage />} />
            <Route exact path="/orders" element={<MyOrdersPage />} />
            <Route
              exact
              path="/order-detail/:id"
              element={<OrderDetailPage />}
            />
            <Route exact path="/billing" element={<BillingPage />} />
            <Route exact path="/search" element={<SearchResults />} />
          </Routes>
          <FooterSection />
        </>
      ) : (
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="*" element={<LoginPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route
            exact
            path="/forgot-password/:token"
            element={<ForgetPassword />}
          />
          <Route exact path="/email-verify" element={<EmailVerifyPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
