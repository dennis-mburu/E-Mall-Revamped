import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../slices/orderApiSlice";
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
                  Delivered on: {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Order Not Delivered</Message>
              )}
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
