import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getFetch } from "../../api/Api";
import { StoreContext } from "../../useContext/Context";

const CategorySection = () => {
  const navigate = useNavigate();

  const { setSubCategory, subCategory } = useContext(StoreContext);
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/category/all?shopName=${process.env.REACT_APP_SHOP_NAME}`;
      const response = await getFetch(url);
      setSubCategory(response?.data?.data?.[0]);
      return response?.data?.data;
    },
    staleTime: 35 * 60 * 1000,
  });

  const handleClick = (categoryId) => {
    navigate(`/sub/${categoryId.categoryName}`, { state: categoryId });
  };

  return (
    <div className="category">
      <div className="container">
        <div className="category-item-container has-scrollbar">
          {categories.length ? (
            categories.map((category) => (
              <div className="category-item" key={category.id}>
                <div className="category-img-box">
                  <img
                    src={`${process.env.REACT_APP_API_URL_LOCAL}/${category.categoryLogo.filename}`}
                    alt={category.categoryName}
                    width="30"
                  />
                </div>

                <div className="category-content-box">
                  <div className="category-content-flex">
                    <h3 className="category-item-title">
                      {category.categoryName}
                    </h3>
                    <p className="category-item-amount">({category.amount})</p>
                  </div>

                  <div
                    className="category-btn"
                    onClick={() => handleClick(category)}
                    style={{ cursor: "pointer" }}
                  >
                    Show all
                  </div>
                </div>
              </div>
            ))
          ) : (
            <> No Categories Found</>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
