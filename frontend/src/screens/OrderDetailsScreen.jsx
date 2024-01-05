import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
} from "../slices/orderApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function OrderDetailsScreen() {
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderByIdQuery(orderId);
  const { userInfo } = useSelector((state) => state.auth);
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  async function handleDeliverOrder(id) {
    try {
      await deliverOrder(id);
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.data);
    }
  }

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
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroupItem>
              <h3>Shipping</h3>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>{" "}
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on: {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">Order Not Delivered</Message>
              )}
              {/* TODO: Add the 'order.isPaid &&' on the ternary below after intergrating the payment functionality */}
              {userInfo.isAdmin && !order.isDelivered && (
                <Button
                  variant="contained"
                  color="success"
                  disabled={loadingDeliver}
                  onClick={() => handleDeliverOrder(order._id)}
                >
                  Mark as Delivered
                </Button>
              )}
              {loadingDeliver && <Loader />}
            </ListGroupItem>
            <ListGroupItem>
              <h3>Payment</h3>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on: {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Order Not Paid</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h3>Order Items</h3>
              {order.orderItems.map((item) => (
                <ListGroupItem key={item._id}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = {item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <h3>Order Summary</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <strong>Items:</strong>
                  </Col>
                  <Col>
                    <p>${order.itemsPrice}</p>{" "}
                  </Col>{" "}
                  <Row>
                    <Col>
                      <strong>Shipping:</strong>
                    </Col>
                    <Col>
                      <p>${order.shippingPrice}</p>{" "}
                    </Col>{" "}
                  </Row>
                  <Row>
                    <Col>
                      <strong>Tax:</strong>
                    </Col>
                    <Col>
                      <p>${order.taxPrice}</p>{" "}
                    </Col>{" "}
                  </Row>
                  <Row>
                    <Col>
                      <strong>Total:</strong>
                    </Col>
                    <Col>
                      <p>${order.totalPrice}</p>{" "}
                    </Col>
                  </Row>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderDetailsScreen;
