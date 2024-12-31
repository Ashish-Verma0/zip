// import React, { useContext, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Box, Typography, CircularProgress, Button } from "@mui/material";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { StoreContext } from "../../useContext/Context";

// import { getOneFetchByUrl } from "../../api/Api";

// const SearchResults = () => {
//   const loaderRef = useRef(null);

//   const { setSearchQuery } = useContext(StoreContext);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const searchQuery = new URLSearchParams(location.search).get("query");

//   const {
//     data,
//     isLoading,
//     isFetchingNextPage,
//     fetchNextPage,
//     hasNextPage,
//     isError,
//     error,
//   } = useInfiniteQuery({
//     queryKey: ["products", searchQuery],
//     queryFn: async ({ pageParam = 1 }) => {
//       const response = await getOneFetchByUrl(
//         `${process.env.REACT_APP_API_URL_LOCAL}/product/search?shopName=${process.env.REACT_APP_SHOP_NAME}&searchQuery=${searchQuery}&page=${pageParam}&resultPerPage=10`
//       );
//       return response.data; // Adjust to match your API response structure
//     },
//     getNextPageParam: (lastPage) => {
//       const nextPage = lastPage?.pagination?.currentPage + 1;
//       return nextPage <= lastPage?.pagination?.totalPages
//         ? nextPage
//         : undefined;
//     },
//     enabled: !!searchQuery,
//     staleTime: 35 * 60 * 1000,
//   });

//   const handleClose = () => {
//     setSearchQuery("");
//     navigate("/");
//   };

//   const products = data?.pages?.flatMap((page) => page.products) || [];
//   const totalProducts = data?.pages?.[0]?.pagination?.totalProducts || 0;

//   useEffect(() => {
//     if (!loaderRef.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 0.1 } // Lower threshold for earlier triggering
//     );

//     observer.observe(loaderRef.current);

//     return () => {
//       if (loaderRef.current) observer.unobserve(loaderRef.current);
//     };
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (isError) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <Typography color="error" variant="h6">
//           {error?.message || "An error occurred while fetching products."}
//         </Typography>
//       </Box>
//     );
//   }

//   if (!products.length) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <Typography variant="h6">
//           No products found for "{searchQuery}".
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <div className="product-container" style={{ marginTop: "20px" }}>
//       <div className="container">
//         <div className="product-box">
//           <div className="product-main">
//             <h2 className="title">Search Result: {searchQuery}</h2>
//             <div className="product-grid">
//               {products.map((product) => (
//                 <div key={product.id} className="showcase">
//                   <div className="showcase-banner">
//                     <div className="image-wrapper">
//                       <img
//                         src={
//                           product?.productimage[0]?.filename?.startsWith(
//                             "https"
//                           )
//                             ? product?.productimage[0]?.filename
//                             : `${process.env.REACT_APP_API_URL_LOCAL}/${product?.productimage[0]?.filename}`
//                         }
//                         alt={product.title || "Product Image"}
//                         className="product-img"
//                         onError={(e) => (e.target.src = "placeholder.png")}
//                       />
//                     </div>
//                     <p className="showcase-badge">
//                       {process.env.REACT_APP_DISCOUNT}%
//                     </p>
//                   </div>
//                   <div className="showcase-content">
//                     <h3 className="showcase-title">{product.title}</h3>
//                     <div className="showcase-rating">
//                       {Array.from({ length: 5 }, (_, starIndex) => (
//                         <ion-icon
//                           key={starIndex}
//                           name={
//                             starIndex < product.rating ? "star" : "star-outline"
//                           }
//                         ></ion-icon>
//                       ))}
//                     </div>
//                     <div className="price-box">
//                       <p className="price">{product.price}</p>
//                       <del>
//                         {process.env.REACT_APP_DISCOUNT * product.price}
//                       </del>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {isFetchingNextPage && <p>Loading more products...</p>}
//           </div>
//         </div>
//       </div>

//       {hasNextPage && (
//         <div ref={loaderRef} style={{ height: "50px", marginTop: "20px" }} />
//       )}

//       {(isLoading || isFetchingNextPage) && (
//         <Typography align="center" sx={{ mt: 2 }}>
//           Loading more products...
//         </Typography>
//       )}
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

// export default React.memo(SearchResults);

import React, { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { StoreContext } from "../../useContext/Context";
import { getOneFetchByUrl } from "../../api/Api";

const SearchResults = () => {
  const loaderRef = useRef(null);

  const { setSearchQuery } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get("query");

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["products", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getOneFetchByUrl(
        `${process.env.REACT_APP_API_URL_LOCAL}/product/search?shopName=${process.env.REACT_APP_SHOP_NAME}&searchQuery=${searchQuery}&page=${pageParam}&resultPerPage=10`
      );
      return response?.data || { pages: [] }; // Ensure a default structure
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.pagination?.currentPage + 1;
      return nextPage <= lastPage?.pagination?.totalPages
        ? nextPage
        : undefined;
    },
    enabled: !!searchQuery,
    staleTime: 35 * 60 * 1000,
  });

  const handleClose = () => {
    setSearchQuery("");
    navigate("/");
  };

  const products = data?.pages?.flatMap((page) => page?.products || []) || [];
  const totalProducts = data?.pages?.[0]?.pagination?.totalProducts || 0;

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error" variant="h6">
          {error?.message || "An error occurred while fetching products."}
        </Typography>
      </Box>
    );
  }

  if (!products.length) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">
          No products found for "{searchQuery}".
        </Typography>
      </Box>
    );
  }

  const handleNavigate = (product) => {
    navigate(`/detail/${product.id}`, { state: product });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="product-container" style={{ marginTop: "20px" }}>
      <div className="container">
        <div className="product-box">
          <div className="product-main">
            <h2 className="title">Search Result: {searchQuery}</h2>
            <div className="product-grid">
              {products.map((product) => (
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
                            starIndex < product.rating ? "star" : "star-outline"
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
              ))}
            </div>
            {isFetchingNextPage && <p>Loading more products...</p>}
          </div>
        </div>
      </div>

      {hasNextPage && (
        <div ref={loaderRef} style={{ height: "50px", marginTop: "20px" }} />
      )}

      {(isLoading || isFetchingNextPage) && (
        <Typography align="center" sx={{ mt: 2 }}>
          Loading more products...
        </Typography>
      )}
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

export default React.memo(SearchResults);
