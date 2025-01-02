import React, { useEffect, useCallback, useContext } from "react";
import { Typography, Skeleton, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { StoreContext } from "../../useContext/Context";

const PopularProduct = () => {
  const navigate = useNavigate();
  const { subCategory } = useContext(StoreContext);

  const fetchProducts = async ({ pageParam = 1 }) => {
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/product/all?shopName=${process.env.REACT_APP_SHOP_NAME}&categoryId=${subCategory?.id}&page=${pageParam}&limit=10`;
    const response = await axios.get(apiUrl);
    const products = response.data.data.products;
    return {
      products,
      nextPage: products.length > 0 ? pageParam + 1 : undefined,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useInfiniteQuery({
      queryKey: ["popularProducts", subCategory?.id],
      queryFn: fetchProducts,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: !!subCategory?.id,
      staleTime: 35 * 60 * 1000,
    });

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleNavigate = (product) => {
    navigate(`/detail/${product.id}`, { state: product });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasProducts =
    data?.pages?.some((page) => page.products.length > 0) ?? false;

  return (
    <div className="product-container">
      <div className="overlay" data-overlay></div>
      <div className="container">
        <div className="product-box">
          <div className="product-main">
            <h2 className="title">Popular Products</h2>

            {/* Show Skeleton Loader or Products */}
            {!hasProducts && !isError && (
              <Grid container spacing={2}>
                {Array.from({ length: 8 }).map((_, index) => (
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

            {hasProducts && (
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
          object-fit: contain;
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

export default React.memo(PopularProduct);
