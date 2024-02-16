import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useFetchDarajaAuthenticationMutation,
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
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

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

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const {
    data: clientIdObj,
    isLoading: loadingClientId,
    error: clientIdError,
  } = useGetPayPalClientIdQuery();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const [fetchAccessToken, { isLoading: loadingAccessToken }] =
    useFetchDarajaAuthenticationMutation();

  useEffect(() => {
    if (!clientIdError && !loadingClientId && clientIdObj) {
      const loadScriptReducer = async function () {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: clientIdObj.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      if (order && !order.isPaid) {
        if (!window.clientIdObj) {
          loadScriptReducer();
        }
      }
    }
  }, [order, clientIdObj, paypalDispatch, clientIdError, loadingClientId]);

  async function handleDeliverOrder(id) {
    try {
      await deliverOrder(id);
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.data);
    }
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((order_id) => {
        return order_id;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async (details) => {
      try {
        const res = await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Payment succeessful");
      } catch (error) {
        toast.error(error.data.message || error.data);
      }
    });
  }

  function onError(error) {
    toast.error(error.message);
  }

  // async function onApproveTest() {
  //   try {
  //     await payOrder({
  //       orderId,
  //       details: { payer: { email_address: userInfo.email } },
  //     }).unwrap();
  //     refetch();
  // toast.success("Payment succeessful");
  //   } catch (error) {
  //     toast.error(error.data.message || error.data);
  //   }
  // }

  async function handleMpesaPay() {
    try {
      const res = await fetchAccessToken().unwrap();
      console.log(res);
      if (res?.access_token) {
        toast.success(res.access_token);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
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
                  <Row>
                    {/* {!order.isPaid && (
                      <>
                        {loadingPay ? (
                          <Loader />
                        ) : (
                          <Button
                            onClick={onApproveTest}
                            className="my-3"
                            variant="contained"
                            fullwidth
                          >
                            Pay Order
                          </Button>
                        )}
                      </>
                    )} */}

                    {order.paymentMethod === "PayPal" && !order.isPaid && (
                      <>
                        {loadingPay || isPending ? (
                          <Loader />
                        ) : (
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          />
                        )}
                      </>
                    )}

                    {order.paymentMethod === "M-Pesa" && !order.isPaid && (
                      <>
                        {loadingPay || loadingAccessToken ? (
                          <Loader />
                        ) : (
                          <button
                            onClick={handleMpesaPay}
                            className="mpesa-btn"
                          >
                            <img src="/images/mpesa.png" alt="" />
                          </button>
                        )}
                      </>
                    )}

                    {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
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
                    {clientIdError && (
                      <ListGroupItem>
                        <Message
                          variant="danger"
                          style={{ textAlign: "center" }}
                        >
                          {clientIdError.data.message || clientIdError.message}
                        </Message>
                      </ListGroupItem>
                    )}
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
