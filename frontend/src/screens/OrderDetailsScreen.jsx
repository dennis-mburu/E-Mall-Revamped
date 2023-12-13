import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../slices/orderApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

function OrderDetailsScreen() {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId);

  if (isLoading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">{error.data.message || error.data}</Message>
    );
  return (
    <>
      <h2>
        Order <em>{order._id}</em>{" "}
      </h2>
    </>
  );
}

export default OrderDetailsScreen;
