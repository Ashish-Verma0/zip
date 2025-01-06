import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import emptycart2 from "../../images/emptycart2.png";
import { getFetch } from "../../api/Api";

import ProductListingPage from "../../Pages/ProductListingPage";

const SubCategorySection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subCategory = location.state;

  const [subCategoryDataa, setSubCategoryDataa] = useState({});

  const fetchSubCategories = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/subcategory/all?shopName=${process.env.REACT_APP_SHOP_NAME}&categoryName=${subCategory?.categoryName}`;
      const response = await getFetch(url);
      return response?.data?.data || [];
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      throw new Error("Failed to fetch subcategories.");
    }
  };

  const {
    data: subCategories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subCategories", subCategory?.categoryName],
    queryFn: fetchSubCategories,
    enabled: !!subCategory?.categoryName,
    staleTime: 35 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="fallback-message">
        <div className="container-noData">
          <div className="content-wrapper">
            <img
              src={emptycart2}
              alt="Empty Menu"
              className="menu-image-noData"
            />
            <h5>
              <strong>Empty Menu</strong>
            </h5>
            <p
              style={{
                fontSize: "15px",
                width: "280px",
                color: "#a7a7a7",
              }}
            >
              Looks like you haven’t made your choice yet...
            </p>
            <button className="noDataBtn" onClick={() => navigate("/")}>
              Back to Menu
            </button>
            <p
              style={{
                fontSize: "12px",
                width: "280px",
              }}
            >
              <span style={{ color: "#ed7c6b", marginTop: "5px" }}>
                Check what we've got for you
              </span>
              <br />
              <span style={{ color: "#c5c5c5" }}>and get it swished!</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fallback-message">
        Failed to load data. Please try again later.
      </div>
    );
  }

  if (!subCategories.length) {
    return (
      <div className="container-noData">
        <div className="content-wrapper">
          <img
            src={emptycart2}
            alt="Empty Menu"
            className="menu-image-noData"
          />
          <h5>
            <strong>Empty Menu</strong>
          </h5>
          <p
            style={{
              fontSize: "15px",
              width: "280px",
              color: "#a7a7a7",
            }}
          >
            Looks like you haven’t made your choice yet...
          </p>
          <button className="noDataBtn" onClick={() => navigate("/")}>
            Back to Menu
          </button>
          <p
            style={{
              fontSize: "12px",
              width: "280px",
            }}
          >
            <span style={{ color: "#ed7c6b", marginTop: "5px" }}>
              Check what we've got for you
            </span>
            <br />
            <span style={{ color: "#c5c5c5" }}>and get it swished!</span>
          </p>
        </div>
      </div>
    );
  }

  const handleAddSubCategory = (category) => {
    setSubCategoryDataa(category || {});
  };

  return (
    <div
      className="product-container"
      style={{ marginTop: "20px", height: "100vh" }}
    >
      <div className="overlay" data-overlay></div>
      <div className="container">
        <div className="sidebar has-scrollbar category-sidebar">
          <div className="sidebar-category">
            <div className="sidebar-top">
              <h2 className="sidebar-title">Category</h2>
            </div>

            <ul
              className="sidebar-menu-category-list"
              style={{
                borderRadius: "5px",
                padding: "5px",
                margin: "0",
                listStyleType: "none",
                width: "250px",
              }}
            >
              {subCategories.map((category, index) => (
                <li
                  className="sidebar-menu-category"
                  key={index}
                  onClick={() => handleAddSubCategory(category)}
                  style={{
                    margin: "5px 0",
                    cursor: "pointer",
                    borderRadius: "4px",
                    transition: "all 0.3s",
                    backgroundColor:
                      subCategoryDataa === category ? "#e0f7fa" : "transparent",
                    boxShadow:
                      subCategoryDataa === category
                        ? "0px 2px 4px rgba(0, 0, 0, 0.2)"
                        : "none",
                  }}
                >
                  <button
                    className="sidebar-accordion-menu"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      backgroundColor: "#fff",
                      border:
                        subCategoryDataa === category
                          ? "1px solid #13a0a8"
                          : "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "10px",
                      textAlign: "left",
                      outline: "none",
                      cursor: "pointer",
                      transition: "all 0.3s",
                   
                    }}
                  >
                    {/* Left Content: Image and Text */}
                    <div
                      className="menu-title-flex"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL_LOCAL}/${
                          category?.subcategoryLogo?.filename ||
                          "default-logo.png"
                        }`}
                        alt={category?.subcategoryName || "Unknown"}
                        width="40"
                        height="40"
                        className="menu-title-img"
                        style={{
                          objectFit: "cover",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                      <p
                        className="menu-title"
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          color:
                            subCategoryDataa === category ? "#13a0a8" : "#333",
                          fontWeight:
                            subCategoryDataa === category ? "bold" : "normal",
                        }}
                      >
                        {category?.subcategoryName || "Unnamed Category"}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="category-section">
          <ul className="category-list">
            {subCategories?.map((category, index) => (
              <li key={index} className="category-item">
                <img
                  src={`${process.env.REACT_APP_API_URL_LOCAL}/${
                    category?.subcategoryLogo?.filename || "default-logo.png"
                  }`}
                  alt={category?.subcategoryName || "Unknown"}
                  className="category-icon"
                />
                <p className="category-name">
                  {category?.subcategoryName || "Unnamed Category"}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <ProductListingPage
          subCategory={subCategory}
          subCategoryDataa={subCategoryDataa}
        />
      </div>

      {/* Styling */}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .container {
            flex-direction: row;
          }
        }
        .fallback-message {
          text-align: center;
          margin: 20px;
          font-size: 18px;
          color: #555;
        }

        .category-sidebar {
          display: none;
        }

        .category-section {
          display: flex;
          overflow-x: auto;
          white-space: nowrap;
          padding: 10px 0;
          margin-bottom: 20px;
          background-color: #f9f9f9;
        }

        .category-list {
          display: flex;
          gap: 15px;
          padding: 0 10px;
          list-style: none;
        }

        .category-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 80px;
        }

        .category-icon {
          width: 40px;
          height: 40px;
          margin-bottom: 5px;
        }

        .category-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .category-section::-webkit-scrollbar {
          display: none; /* Hide scrollbar */
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        @media (min-width: 768px) {
          .category-sidebar {
            display: block; /* Sidebar visible on tablet and desktop */
          }

          .category-section {
            display: none; /* Hide mobile category section on larger screens */
          }

          .product-grid {
            grid-template-columns: repeat(4, 1fr); /* Adjust for desktop */
          }
        }

        @media (min-width: 600px) and (max-width: 1024px) {
          /* Adjust styles specifically for iPads */
          .category-section {
            display: flex; /* Show mobile category section on iPads */
          }
          .category-sidebar {
            display: block; /* Show sidebar on iPads */
          }
          .product-grid {
            grid-template-columns: repeat(3, 1fr); /* Adjust for iPad */
          }
        }
      `}</style>
    </div>
  );
};

export default SubCategorySection;
