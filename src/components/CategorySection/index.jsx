import React from "react";
import { useNavigate } from "react-router-dom";

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "1",
      title: "Dress & Frock",
      image: "./assets/images/icons/dress.svg",
      amount: 53,
    },
    {
      id: "2",
      title: "Shoes & Sandals",
      image: "./assets/images/icons/shoes.svg",
      amount: 42,
    },
    {
      id: "3",
      title: "Bags & Wallets",
      image: "./assets/images/icons/bag.svg",
      amount: 36,
    },
    {
      id: "4",
      title: "Accessories",
      image: "./assets/images/icons/dress.svg",
      amount: 25,
    },
  ];

  const handleClick = (categoryId) => {
    navigate(`/sub/${categoryId}`);
  };

  return (
    <div className="category">
      <div className="container">
        <div className="category-item-container has-scrollbar">
          {categories.map((category) => (
            <div className="category-item" key={category.id}>
              <div className="category-img-box">
                <img src={category.image} alt={category.title} width="30" />
              </div>

              <div className="category-content-box">
                <div className="category-content-flex">
                  <h3 className="category-item-title">{category.title}</h3>
                  <p className="category-item-amount">({category.amount})</p>
                </div>

                <div
                  className="category-btn"
                  onClick={() => handleClick(category.id)}
                  style={{ cursor: "pointer" }}
                >
                  Show all
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
