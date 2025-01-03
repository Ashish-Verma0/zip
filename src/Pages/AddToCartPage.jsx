import { getOneFetchByUrl } from "../api/Api";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AddToCartSection from "../components/AddToCartSection";
const CartPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const handleClickToBilling = () => {
    if (cartItems.length) {
      navigate(`/billing`);
      return;
    }

    alert("No Item Added");
  };

  useEffect(() => {
    const validateCartStock = async () => {
      const validatedCart = await Promise.all(
        cartItems.map(async (item) => {
          const response = await getOneFetchByUrl(
            `${process.env.REACT_APP_API_URL_LOCAL}/product/productDetail?productId=${item?.id}`
          );
          console.log("response", response);
          const { stock } = response?.data[0];

          if (stock === 0) {
            alert(
              `The product "${item?.title}" is out of stock and has been removed.`
            );
            return null;
          }
          if (item?.quantity > stock) {
            alert(
              `The quantity for "${item?.title}" has been updated to the available stock (${stock}).`
            );
            return { ...item, quantity: stock };
          }
          return item;
        })
      );

      setCartItems(validatedCart?.filter(Boolean));
    };

    validateCartStock();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, increment) => {
    setCartItems((prevItems) =>
      prevItems
        ?.map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + increment;
            if (newQuantity > item.stock) {
              alert(`Only ${item.stock} items are available in stock.`);
              return item;
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <AddToCartSection
        total={total}
        cartItems={cartItems}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
        handleClickToBilling={handleClickToBilling}
      />
    </div>
  );
};

export default CartPage;
