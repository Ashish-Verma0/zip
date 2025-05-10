import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { getOneFetchByUrl } from "../api/Api";
import { useLocation, useNavigate } from "react-router-dom";
import no_data_search from "../animation/no_data_search.png";

const ProductListingPage = ({ subCategory, subCategoryDataa }) => {
  const [sortOption, setSortOption] = useState("default");
  const [isError, setIsError] = useState(false);
  const loaderRef = useRef(null);
  const location = useLocation();

  const fetchProducts = async ({ pageParam = 1 }) => {
    try {
      if (!subCategory?.id) {
        throw new Error("Missing subCategory or subCategoryDataa IDs");
      }

      if (subCategory?.id && subCategoryDataa?.id) {
        const response = await getOneFetchByUrl(
          `${process.env.REACT_APP_API_URL_LOCAL}/product/all?shopName=${process.env.REACT_APP_SHOP_NAME}&categoryId=${subCategory?.id}&subcategoryId=${subCategoryDataa?.id}&page=${pageParam}`
        );
        return (
          response?.data || {
            products: [],
            pagination: { currentPage: 1, totalPages: 1 },
          }
        );
      } else {
        const response = await getOneFetchByUrl(
          `${process.env.REACT_APP_API_URL_LOCAL}/product/all?shopName=${process.env.REACT_APP_SHOP_NAME}&categoryId=${subCategory?.id}&page=${pageParam}`
        );
        return (
          response?.data || {
            products: [],
            pagination: { currentPage: 1, totalPages: 1 },
          }
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setIsError(true);
      return { products: [], pagination: { currentPage: 1, totalPages: 1 } };
    }
  };

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["products", subCategory?.id, subCategoryDataa?.id],
      queryFn: fetchProducts,
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage?.pagination?.currentPage + 1;
        return nextPage <= lastPage?.pagination?.totalPages
          ? nextPage
          : undefined;
      },
      staleTime: 35 * 60 * 1000,
      enabled: !!subCategory?.id || !!subCategoryDataa?.id,
    });

  useEffect(() => {
    if (!loaderRef.current || isError) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isError]);

  const products = data?.pages?.flatMap((page) => page?.products) || [];

  const sortedProducts = [...products]?.sort((a, b) => {
    if (sortOption === "priceLowHigh") return a?.price - b?.price;
    if (sortOption === "priceHighLow") return b?.price - a?.price;
    if (sortOption === "rating") return b?.rating - a?.rating;
    if (sortOption === "name") return a?.title.localeCompare(b?.title);
    return 0;
  });

  const navigate = useNavigate();

  const handleNavigate = (product) => {
    navigate(`/detail/${product.id}`, { state: product });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isError || !products?.length) {
    return (
       <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        height="77.9vh"
      >
        <Typography variant="h6">
          No products found
        </Typography>
        <img
          src={no_data_search}
          alt="No data found"
          style={{ maxWidth: "400px", marginBottom: "20px" }}
        />
      </Box>
    );
  }

  return (
    <div className="product-container" style={{ marginBottom: "80px" }}>
      <div className="overlay" data-overlay></div>
      <div className="container">
        <div className="product-box">
          <div className="product-main">
            <h2 className="title">Sub Caterory Product</h2>

            {/* Show Skeleton Loader or Products */}
            {!sortedProducts && !isError && (
              <Grid container spacing={2}>
                {Array.from({ length: 20 }).map((_, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={200}
                      animation="wave"
                    />
                    <Skeleton variant="text" width="60%" animation="wave" />
                    <Skeleton variant="text" width="40%" animation="wave" />
                  </Grid>
                ))}
              </Grid>
            )}

            {isError && (
              <Typography variant="h6" align="center" color="error" mt={2}>
                Something went wrong. Please try again later.
              </Typography>
            )}

            {sortedProducts && (
              <div className="product-grid">
                {data?.pages.map((page, pageIndex) =>
                  page.products.map((product) => (
                    <div
                      key={product.id}
                      className="showcase"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleNavigate(product)}
                    >
                      <div className="showcase-banner">
                        <div className="image-container">
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

                      <div
                        className="showcase-content"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.category.categoryName}

                        <h3
                          className="showcase-title"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {product.title}
                        </h3>

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
                          <del>{product.price}</del>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
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

        .showcase-banner {
          position: relative;
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f5f5f5;
          border-radius: 10px;
          overflow: hidden;
        }

        .product-img {
          height: 100%;
          // object-fit: contain;
          transition: transform 0.3s ease-in-out;
        }

        del {
          font-size: 0.9rem;
          color: #999;
        }

        .image-container {
          background-color: rgba(
            255,
            255,
            255,
            0.5
          ); /* Semi-transparent background */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          height: 200px;
        }

        .product-img {
          object-fit: contain; /* Ensure the full image is visible */
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default ProductListingPage;
