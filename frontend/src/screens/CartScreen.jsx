import React from "react";
import {
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Image,
  FormSelect,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { FaTrash } from "react-icons/fa";
import { addToCart } from "../slices/cartSlice";

function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  function addToCartHandler(product, qty) {
    dispatch(addToCart({ ...product, qty }));
  }

  return (
    <>
      <Row>
        <Col md={8}>
          <h1 className="text-3xl font-bold underline text-center m-3">
            Shopping Cart
          </h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is currently empty
              <LinkContainer className="ml-4" to="/">
                <Button variant="primary">Go Back</Button>
              </LinkContainer>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} rounded fluid />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={3}>
                      <FormSelect
                        value={item.qty}
                        onChange={(e) => {
                          addToCartHandler(item, Number(e.target.value));
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormSelect>
                    </Col>
                    <Col md={2}>
                      <Button variant="danger">
                        <FaTrash className="text-red-500" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className="mt-4">
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2 className="text-xl font-bold underline text-center">
                  Subtotal ({cartItems.reduce((a, i) => a + i.qty, 0)}) Items
                </h2>
                <p>${cart.totalPrice}</p>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="bg-blue-600"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CartScreen;
