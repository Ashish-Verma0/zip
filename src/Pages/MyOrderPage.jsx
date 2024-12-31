// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getOneFetchByUrl } from "../api/Api";

// const MyOrders = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const userId = JSON.parse(token);

//   const url = `${process.env.REACT_APP_API_URL_LOCAL}/order/all/user?userId=${
//     userId.user.id
//   }&page=${"1"}&limit=${"10"}`;

//   const {
//     data: OrderDetail = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["OrderDetails", userId.user.id],
//     queryFn: async () => {
//       const response = await getOneFetchByUrl(url);
//       return response?.data || [];
//     },
//     enabled: !!userId.user.id,
//     staleTime: 35 * 60 * 1000,
//   });

//   const OrderDetails = OrderDetail.orders || [];

//   const handleNavigate = (id) => {
//     navigate(`/order-detail/${id}`);
//   };

//   if (isLoading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <h2>Loading Orders...</h2>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <h2 style={{ color: "red" }}>
//           Failed to load orders. Please try again later.
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="order-container"
//       style={{
//         marginTop: "20px",
//       }}
//     >
//       <div className="overlay" data-overlay></div>
//       <div className="container">
//         <div className="order-box">
//           <div className="order-main">
//             <h2 className="title">Order Details</h2>

//             <div className="order-grid">
//               {OrderDetails.map((order) => (
//                 <div
//                   key={order.id}
//                   className="order-card"
//                   onClick={() => handleNavigate(order.id)}
//                 >
//                   <div className="order-image">
//                     <img
//                       src={
//                         order.orderedItems[0]?.productimage[0]?.filename.startsWith(
//                           "https"
//                         )
//                           ? order.orderedItems[0]?.productimage[0]?.filename
//                           : `${process.env.REACT_APP_API_URL_LOCAL}/${order.orderedItems[0]?.productimage[0]?.filename}`
//                       }
//                       alt={`Order ${order.id}`}
//                       width="120"
//                       height="120"
//                       style={{ objectFit: "cover", borderRadius: "8px" }}
//                     />
//                   </div>
//                   <div className="order-details">
//                     <h3 className="order-title">Order ID: {order.id}</h3>
//                     <p className="order-category">
//                       Transaction ID: {order.transactionId || "N/A"}
//                     </p>
//                     <p className="order-status">
//                       Status: {order.status || "Unknown"}
//                     </p>
//                     <p className="order-price">Price: ₹{order.subTotal}</p>
//                     <p className="order-date">
//                       Date: {new Date(order.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .order-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 15px;
//         }

//         .order-card {
//           display: flex;
//           align-items: center;
//           padding: 15px;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           background-color: #fff;
//           cursor: pointer;
//           transition: transform 0.3s;
//         }

//         .order-card:hover {
//           transform: scale(1.03);
//         }

//         .order-image img {
//           border-radius: 8px;
//         }

//         .order-details {
//           margin-left: 15px;
//           flex: 1;
//         }

//         .order-title {
//           font-size: 18px;
//           font-weight: bold;
//           margin-bottom: 8px;
//         }

//         .order-category,
//         .order-status,
//         .order-price,
//         .order-date {
//           font-size: 14px;
//           margin-bottom: 5px;
//           color: #555;
//         }

//         @media (min-width: 768px) {
//           .order-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         @media (min-width: 600px) and (max-width: 1024px) {
//           .order-grid {
//             grid-template-columns: repeat(1, 1fr);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MyOrders;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOneFetchByUrl } from "../api/Api";

const MyOrders = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = JSON.parse(token);

  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const url = `${process.env.REACT_APP_API_URL_LOCAL}/order/all/user?userId=${
    userId?.user?.id || ""
  }&page=${page}&limit=10`;

  const {
    data: OrderDetail,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["OrderDetails", userId?.user?.id, page],
    queryFn: async () => {
      if (!userId?.user?.id) throw new Error("Invalid User ID");
      const response = await getOneFetchByUrl(url);
      if (!response?.data) throw new Error("No data available");
      return response.data;
    },
    enabled: !!userId?.user?.id,
    staleTime: 35 * 60 * 1000,
    onError: (err) => console.error("Query Error:", err.message),
  });

  // Update orders and check for more data
  useEffect(() => {
    if (OrderDetail && OrderDetail.orders) {
      setOrders((prevOrders) => [...prevOrders, ...OrderDetail.orders]);
      // Check if there are more orders to fetch
      setHasMore(OrderDetail.pagination.totalPages > page);
    }
  }, [OrderDetail]);

  const handleNavigate = (id) => {
    navigate(`/order-detail/${id}`);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      hasMore &&
      !isFetchingMore &&
      !isLoading
    ) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isFetchingMore]);

  // Reset fetching state when the page changes
  useEffect(() => {
    if (isFetchingMore) {
      setIsFetchingMore(false);
    }
  }, [page]);

  if (isLoading && page === 1) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  if (isError || !orders.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2 style={{ color: "red" }}>
          {error?.message || "Failed to load orders. Please try again later."}
        </h2>
      </div>
    );
  }

  return (
    <div className="order-container" style={{ marginTop: "20px" }}>
      <div className="overlay" data-overlay></div>
      <div className="container">
        <div className="order-box">
          <div className="order-main">
            <h2 className="title">Order Details</h2>

            <div className="order-grid">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="order-card"
                  onClick={() => handleNavigate(order.id)}
                >
                  <div className="order-image">
                    <img
                      src={
                        order.orderedItems[0]?.productimage[0]?.filename.startsWith(
                          "https"
                        )
                          ? order.orderedItems[0]?.productimage[0]?.filename
                          : `${process.env.REACT_APP_API_URL_LOCAL}/${order.orderedItems[0]?.productimage[0]?.filename}`
                      }
                      alt={`Order ${order.id}`}
                      width="120"
                      height="120"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="order-details">
                    <h3 className="order-title">Order ID: {order.id}</h3>
                    <p className="order-category">
                      Transaction ID: {order.transactionId || "N/A"}
                    </p>
                    <p className="order-status">
                      Status: {order.status || "Unknown"}
                    </p>
                    <p className="order-price">Price: ₹{order.subTotal}</p>
                    <p className="order-date">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Loading indicator for additional orders */}
            {isFetchingMore && (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h3>Loading more orders...</h3>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .order-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
        }

        .order-card {
          display: flex;
          align-items: center;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #fff;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .order-card:hover {
          transform: scale(1.03);
        }

        .order-image img {
          border-radius: 8px;
        }

        .order-details {
          margin-left: 15px;
          flex: 1;
        }

        .order-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .order-category,
        .order-status,
        .order-price,
        .order-date {
          font-size: 14px;
          margin-bottom: 5px;
          color: #555;
        }

        @media (min-width: 768px) {
          .order-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 600px) and (max-width: 1024px) {
          .order-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default MyOrders;
