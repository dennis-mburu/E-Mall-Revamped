import React from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import Button from "@mui/material/Button";
import {
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { clearCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [placeOrder] = useCreateOrderMutation();

  const {
    cartItems,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
  } = useSelector((state) => state.cart);

  async function handlePlaceOrder() {
    try {
      const res = await placeOrder({
        cartItems,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentMethod,
      }).unwrap();
      dispatch(clearCart());
      navigate("/");
    } catch (error) {
      toast.error(error.data.message || error.data);
    }
  }

  return (
    <>
      <div className=" mt-3 flex justify-center">
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <Row>
        <Col md={7}>
          <ListGroup>
            <ListGroupItem>
              <h2> Shipping</h2>
              <p>
                <strong>Addess: </strong>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.country}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroupItem key={item._id}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} fluid rounded alt={item.name} />
                      </Col>
                      <Col>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = {itemsPrice}
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <h2>Order Summary </h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <p>
                      <strong>Items: </strong>
                    </p>
                  </Col>
                  <Col>
                    <p>${itemsPrice}</p>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>
                    <p>
                      <strong>Shipping: </strong>
                    </p>
                  </Col>
                  <Col>
                    <p>${shippingPrice}</p>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <p>
                      <strong>Tax: </strong>
                    </p>
                  </Col>
                  <Col>
                    <p>${taxPrice}</p>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <p>
                      <strong>Total: </strong>
                    </p>
                  </Col>
                  <Col>
                    <p>${totalPrice}</p>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
            <ListGroupItem></ListGroupItem>
            <ListGroupItem>
              <Button variant="contained" disabled={cartItems.length === 0} fullWidth onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </ListGroupItem>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderScreen;
