// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

// import { getFetch } from "../../api/Api";

// import ProductListingPage from "../../Pages/ProductListingPage";

// const SubCategorySection = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const subCategory = location.state;

//   const [subCategoryDataa, setSubCategoryDataa] = useState({});

//   const fetchSubCategories = async () => {
//     const url = `${process.env.REACT_APP_API_URL_LOCAL}/subcategory/all?shopName=${process.env.REACT_APP_SHOP_NAME}&categoryName=${subCategory.categoryName}`;
//     const response = await getFetch(url);
//     setSubCategoryDataa(response?.data?.data[0]);
//     return response?.data?.data;
//   };

//   const {
//     data: subCategories = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["subCategories", subCategory.categoryName],
//     queryFn: fetchSubCategories,
//     enabled: !!subCategory.categoryName,
//     staleTime: 35 * 60 * 1000,
//   });

//   return (
//     <div className="product-container" style={{ marginTop: "20px" }}>
//       <div className="overlay" data-overlay></div>
//       <div className="container">
//         {/* Sidebar for Categories (Desktop & Tablet) */}
//         <div className="sidebar has-scrollbar category-sidebar">
//           <div className="sidebar-category">
//             <div className="sidebar-top">
//               <h2 className="sidebar-title">Category</h2>
//             </div>

//             <ul className="sidebar-menu-category-list">
//               {subCategories.map((category, index) => (
//                 <li className="sidebar-menu-category" key={index}>
//                   <button className="sidebar-accordion-menu">
//                     <div className="menu-title-flex">
//                       <img
//                         src={`${process.env.REACT_APP_API_URL_LOCAL}/${category.subcategoryLogo.filename}`}
//                         alt={category.subcategoryName}
//                         width="20"
//                         height="20"
//                         className="menu-title-img"
//                       />
//                       <p className="menu-title">{category.subcategoryName}</p>
//                     </div>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Category Section (Mobile) */}
//         <div className="category-section">
//           <ul className="category-list">
//             {subCategories.map((category, index) => (
//               <li key={index} className="category-item">
//                 <img
//                   src={`${process.env.REACT_APP_API_URL_LOCAL}/${category.subcategoryLogo.filename}`}
//                   alt={category.subcategoryName}
//                   className="category-icon"
//                 />
//                 <p className="category-name">{category.subcategoryName}</p>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <ProductListingPage
//           subCategory={subCategory}
//           subCategoryDataa={subCategoryDataa}
//         />
//       </div>

//       {/* Styling */}
//       <style jsx>{`
//         /* Sidebar for Desktop & Tablet */
//         .category-sidebar {
//           display: none;
//         }

//         /* Mobile Category Section */
//         .category-section {
//           display: flex;
//           overflow-x: auto;
//           white-space: nowrap;
//           padding: 10px 0;
//           margin-bottom: 20px;
//           background-color: #f9f9f9;
//         }

//         .category-list {
//           display: flex;
//           gap: 15px;
//           padding: 0 10px;
//           list-style: none;
//         }

//         .category-item {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           text-align: center;
//           min-width: 80px;
//         }

//         .category-icon {
//           width: 40px;
//           height: 40px;
//           margin-bottom: 5px;
//         }

//         .category-name {
//           font-size: 14px;
//           font-weight: 500;
//           color: #333;
//         }

//         .category-section::-webkit-scrollbar {
//           display: none; /* Hide scrollbar */
//         }

//         .product-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 10px;
//         }

//         @media (min-width: 768px) {
//           .category-sidebar {
//             display: block; /* Sidebar visible on tablet and desktop */
//           }

//           .category-section {
//             display: none; /* Hide mobile category section on larger screens */
//           }

//           .product-grid {
//             grid-template-columns: repeat(4, 1fr); /* Adjust for desktop */
//           }
//         }

//         @media (min-width: 600px) and (max-width: 1024px) {
//           /* Adjust styles specifically for iPads */
//           .category-section {
//             display: flex; /* Show mobile category section on iPads */
//           }
//           .category-sidebar {
//             display: block; /* Show sidebar on iPads */
//           }
//           .product-grid {
//             grid-template-columns: repeat(3, 1fr); /* Adjust for iPad */
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SubCategorySection;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
      setSubCategoryDataa(response?.data?.data?.[0] || {});
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

  // Fallback UI for loading, error, or no data
  if (isLoading) {
    return <div className="fallback-message">Loading subcategories...</div>;
  }

  if (error) {
    return (
      <div className="fallback-message">
        Failed to load data. Please try again later.
      </div>
    );
  }

  if (!subCategories.length) {
    return <div className="fallback-message">No data found.</div>;
  }

  const handleAddSubCategory = (category) => {
    setSubCategoryDataa(category || {});
  };

  return (
    <div className="product-container" style={{ marginTop: "20px" }}>
      <div className="overlay" data-overlay></div>
      <div className="container">
        {/* Sidebar for Categories (Desktop & Tablet) */}
        <div className="sidebar has-scrollbar category-sidebar">
          <div className="sidebar-category">
            <div className="sidebar-top">
              <h2 className="sidebar-title">Category</h2>
            </div>

            <ul className="sidebar-menu-category-list">
              {subCategories.map((category, index) => (
                <li
                  className="sidebar-menu-category"
                  key={index}
                  onClick={() => handleAddSubCategory(category)}
                >
                  <button className="sidebar-accordion-menu">
                    <div className="menu-title-flex">
                      <img
                        src={`${process.env.REACT_APP_API_URL_LOCAL}/${
                          category?.subcategoryLogo?.filename ||
                          "default-logo.png"
                        }`}
                        alt={category?.subcategoryName || "Unknown"}
                        width="20"
                        height="20"
                        className="menu-title-img"
                      />
                      <p className="menu-title">
                        {category?.subcategoryName || "Unnamed Category"}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Category Section (Mobile) */}
        <div className="category-section">
          <ul className="category-list">
            {subCategories.map((category, index) => (
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
        .fallback-message {
          text-align: center;
          margin: 20px;
          font-size: 18px;
          color: #555;
        }

        /* Sidebar for Desktop & Tablet */
        .category-sidebar {
          display: none;
        }

        /* Mobile Category Section */
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
