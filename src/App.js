import { Route, Routes } from "react-router-dom";
import "./App.css";
import SubCategorySection from "./components/SubCategorySection";
import NavBar from "./components/NavBar";
import FooterSection from "./components/FooterSection";
import HomePage from "./Pages/HomePage";
import AddToCartPage from "./Pages/AddToCartPage";
import MyOrderPage from "./Pages/MyOrderPage";
import ProfilePage from "./Pages/ProfilePage";


function App() {
  return (
    <>
    <NavBar />

    <Routes>
    <Route exact path="/" element={<HomePage/>}/>
    <Route exact path="/sub/:category" element={<SubCategorySection/>}/>
    <Route exact path="/Add" element={<AddToCartPage/>}/>
    <Route exact path="/myOrder" element={<MyOrderPage/>}/>
    <Route exact path="/profile" element={<ProfilePage/>}/>
    </Routes>
    <FooterSection/>
    </>
  );
}

export default App;
