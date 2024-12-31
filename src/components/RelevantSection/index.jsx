// import { useInfiniteQuery } from "@tanstack/react-query";
// import React, { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { getOneFetchByUrl } from "../../api/Api";

// const RelevantSection = ({ location }) => {
//   const loaderRef = useRef(null);

//   const {
//     data: relevantProductsData,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: [
//       "relevantProducts",
//       process.env.REACT_APP_SHOP_NAME,
//       location.state.category.id,
//     ],
//     queryFn: async ({ pageParam = 1 }) => {
//       const response = await getOneFetchByUrl(
//         `${process.env.REACT_APP_API_URL_LOCAL}/product/all?shopName=${process.env.REACT_APP_SHOP_NAME}&categoryId=${location.state.category.id}&page=${pageParam}`
//       );
//       return {
//         products: response?.data.products || [],
//         totalPages: response?.data.pagination?.totalPages || 1,
//         currentPage: pageParam,
//       };
//     },
//     getNextPageParam: (lastPage) =>
//       lastPage.currentPage < lastPage.totalPages
//         ? lastPage.currentPage + 1
//         : undefined,
//     staleTime: 35 * 60 * 1000,
//   });

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => {
//       if (loaderRef.current) observer.unobserve(loaderRef.current);
//     };
//   }, [hasNextPage, fetchNextPage]);

//   const navigate = useNavigate();

//   const handleNavigate = (product) => {
//     navigate(`/detail/${product.id}`, { state: product });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div
//       className="product-container"
//       style={{
//         marginTop: "20px",
//       }}
//     >
//       <div className="container">
//         {/* Main Product Section */}
//         <div className="product-box">
//           <div className="product-main">
//             <h2 className="title">Popular Product</h2>

//             <div className="product-grid">
//               {relevantProductsData?.pages.map((page) =>
//                 page.products.map((product) => (
//                   <div
//                     key={product.id}
//                     className="showcase"
//                     onClick={() => handleNavigate(product)}
//                   >
//                     <div className="showcase-banner">
//                       <div className="image-wrapper">
//                         <img
//                           src={
//                             product?.productimage[0]?.filename?.startsWith(
//                               "https"
//                             )
//                               ? product?.productimage[0]?.filename
//                               : `${process.env.REACT_APP_API_URL_LOCAL}/${product?.productimage[0]?.filename}`
//                           }
//                           alt={product.title || "Product Image"}
//                           className="product-img"
//                           onError={(e) => (e.target.src = "placeholder.png")}
//                         />
//                       </div>
//                       <p className="showcase-badge">
//                         {process.env.REACT_APP_DISCOUNT}%
//                       </p>
//                     </div>

//                     <div className="showcase-content">
//                       <h3 className="showcase-title">{product.title}</h3>
//                       <div className="showcase-rating">
//                         {Array.from({ length: 5 }, (_, starIndex) => (
//                           <ion-icon
//                             key={starIndex}
//                             name={
//                               starIndex < product.rating
//                                 ? "star"
//                                 : "star-outline"
//                             }
//                           ></ion-icon>
//                         ))}
//                       </div>
//                       <div className="price-box">
//                         <p className="price">{product.price}</p>
//                         <del>
//                           {process.env.REACT_APP_DISCOUNT * product.price}
//                         </del>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//             {isFetchingNextPage && <p>Loading more products...</p>}
//           </div>
//         </div>
//       </div>

//       {/* Infinite Scroll Loader */}
//       <div
//         ref={loaderRef}
//         style={{ height: "20px", background: "transparent" }}
//       ></div>

//       {/* Styling */}
//       <style jsx>{`
//         .product-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 10px;
//         }

//         @media (min-width: 768px) {
//           .product-grid {
//             grid-template-columns: repeat(4, 1fr);
//           }
//         }

//         @media (min-width: 600px) and (max-width: 1024px) {
//           .product-grid {
//             grid-template-columns: repeat(3, 1fr);
//           }
//         }

//         .image-wrapper {
//           background: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 100%;
//           height: 200px;
//         }

//         .product-img {
//           object-fit: contain;
//           width: auto;
//           height: 100%;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RelevantSection;

import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getOneFetchByUrl } from "../../api/Api";

const RelevantSection = ({ location }) => {
  const loaderRef = useRef(null);

  const {
    data: relevantProductsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [
      "relevantProducts",
      process.env.REACT_APP_SHOP_NAME,
      location.state.category.id,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getOneFetchByUrl(
        `${process.env.REACT_APP_API_URL_LOCAL}/product/all?shopName=${process.env.REACT_APP_SHOP_NAME}&categoryId=${location.state.category.id}&page=${pageParam}`
      );
      return {
        products: response?.data.products || [],
        totalPages: response?.data.pagination?.totalPages || 1,
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined,
    staleTime: 35 * 60 * 1000,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  const navigate = useNavigate();

  const handleNavigate = (product) => {
    navigate(`/detail/${product.id}`, { state: product });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {"No Data Found"}</p>;
  }

  const isEmpty = relevantProductsData?.pages?.every(
    (page) => page.products.length === 0
  );

  return (
    <div
      className="product-container"
      style={{
        marginTop: "20px",
      }}
    >
      <div className="container">
        {/* Main Product Section */}
        <div className="product-box">
          <div className="product-main">
            <h2 className="title">Popular Product</h2>

            {isEmpty ? (
              <p>No Data Found</p>
            ) : (
              <div className="product-grid">
                {relevantProductsData?.pages.map((page) =>
                  page.products.map((product) => (
                    <div
                      key={product.id}
                      className="showcase"
                      onClick={() => handleNavigate(product)}
                    >
                      <div className="showcase-banner">
                        <div className="image-wrapper">
                          <img
                            src={
                              product?.productimage[0]?.filename?.startsWith(
                                "https"
                              )
                                ? product?.productimage[0]?.filename
                                : `${process.env.REACT_APP_API_URL_LOCAL}/${product?.productimage[0]?.filename}`
                            }
                            alt={product.title || "Product Image"}
                            className="product-img"
                            onError={(e) => (e.target.src = "placeholder.png")}
                          />
                        </div>
                        <p className="showcase-badge">
                          {process.env.REACT_APP_DISCOUNT}%
                        </p>
                      </div>

                      <div className="showcase-content">
                        <h3 className="showcase-title">{product.title}</h3>
                        <div className="showcase-rating">
                          {Array.from({ length: 5 }, (_, starIndex) => (
                            <ion-icon
                              key={starIndex}
                              name={
                                starIndex < product.rating
                                  ? "star"
                                  : "star-outline"
                              }
                            ></ion-icon>
                          ))}
                        </div>
                        <div className="price-box">
                          <p className="price">{product.price}</p>
                          <del>
                            {process.env.REACT_APP_DISCOUNT * product.price}
                          </del>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {isFetchingNextPage && <p>Loading more products...</p>}
          </div>
        </div>
      </div>

      {/* Infinite Scroll Loader */}
      <div
        ref={loaderRef}
        style={{ height: "20px", background: "transparent" }}
      ></div>

      {/* Styling */}
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        @media (min-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (min-width: 600px) and (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .image-wrapper {
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 200px;
        }

        .product-img {
          object-fit: contain;
          width: auto;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default RelevantSection;
