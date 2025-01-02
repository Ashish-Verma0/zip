import { Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { getOneFetchByUrl } from "../api/Api";
import { useLocation, useNavigate } from "react-router-dom";

const ProductListingPage = ({ subCategory, subCategoryDataa }) => {
  const [sortOption, setSortOption] = useState("default");
  const [isError, setIsError] = useState(false);
  const loaderRef = useRef(null);
  const location = useLocation();
  console.log("subCategoryDataa", subCategoryDataa, subCategory);

  const fetchProducts = async ({ pageParam = 1 }) => {
    try {
      if (!subCategory?.id) {
        throw new Error("Missing subCategory or subCategoryDataa IDs");
      }

      if (subCategory?.id) {
        const response = await getOneFetchByUrl(
          `${process.env.REACT_APP_API_URL_LOCAL}/product/all?shopName=${process.env.REACT_APP_SHOP_NAME}&categoryId=${subCategory?.id}&page=${pageParam}`
        );
        return response?.data || [];
      }

      if (subCategory?.id && subCategoryDataa?.id) {
        const response = await getOneFetchByUrl(
          `${process.env.REACT_APP_API_URL_LOCAL}/product/all?shopName=${process.env.REACT_APP_SHOP_NAME}&categoryId=${subCategory?.id}&subcategoryId=${subCategoryDataa?.id}&page=${pageParam}`
        );
        return response?.data || [];
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
      <div className="no-data">
        <img src={"NoDataImage"} alt="No Data" />
        <p>Oops! No products found. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="product-box">
      <div className="product-main">
        <h2 className="title">Sub Category Product</h2>

        <div className="product-grid">
          {sortedProducts?.map((product) => (
            <div
              key={product?.id}
              className="showcase"
              onClick={() => handleNavigate(product)}
            >
              <div className="showcase-banner">
                <div className="image-container">
                  <img
                    src={
                      product?.productimage[0]?.filename?.startsWith("https")
                        ? product?.productimage[0]?.filename
                        : `${process.env.REACT_APP_API_URL_LOCAL}/${product?.productimage[0]?.filename}`
                    }
                    alt={product?.title || "Product Image"}
                    className="product-img"
                    onError={(e) => (e.target.src = "placeholder.png")}
                  />
                </div>
                <p className="showcase-badge">
                  {process.env.REACT_APP_DISCOUNT}%
                </p>
              </div>

              <div className="showcase-content">
                {product?.category?.categoryName}
                <h3 className="showcase-title">{product?.title}</h3>
                <div className="showcase-rating">
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <ion-icon
                      key={starIndex}
                      name={
                        starIndex < product?.rating ? "star" : "star-outline"
                      }
                    ></ion-icon>
                  ))}
                </div>
                <div className="price-box">
                  <p className="price">{product?.price}</p>
                  <del>
                    {process.env.REACT_APP_DISCOUN_MULTIPLE * product?.price}
                  </del>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasNextPage && (
          <div ref={loaderRef} style={{ height: "50px", marginTop: "20px" }} />
        )}

        {(isLoading || isFetchingNextPage) && (
          <Typography align="center" sx={{ mt: 2 }}>
            Loading more products...
          </Typography>
        )}
      </div>

      <style jsx>{`
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
          width: 100%;
          height: 200px; /* Adjust as needed */
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
