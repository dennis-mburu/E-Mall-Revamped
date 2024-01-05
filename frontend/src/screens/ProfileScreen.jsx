import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../slices/authApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loader from "../components/Loader";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: orders,
    isLoading: loadingOrders,
    error,
  } = useGetMyOrdersQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      try {
        const res = await updateProfile({ name, email, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message || error.data);
      }
    }
  }

  return (
    <Row>
      <Col md={4}>
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              //   boxShadow: 3,
              borderRadius: 2,
              px: 4,
              py: 6,
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Profile Details
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                type="email"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              <TextField
                type="password"
                margin="normal"
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                type="password"
                margin="normal"
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="confirm password"
                autoFocus
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loadingUpdateProfile}
              >
                Update Profile
              </Button>
              {loadingUpdateProfile && <Loader />}
            </Box>
          </Box>
        </Container>
      </Col>
      <Col>
        <Box
          sx={{
            // boxShadow: 3,
            // borderRadius: 2,
            // // px: 4,
            // py: 6,
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            My Orders
          </Typography>
          {loadingOrders ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error.data.message || error.data}
            </Message>
          ) : (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">DATE</TableCell>
                    <TableCell align="center">TOTAL</TableCell>
                    <TableCell align="center">PAID</TableCell>
                    <TableCell align="center">DELIVERED</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders?.map((order) => (
                    <TableRow
                      hover
                      key={order._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/orders/${order._id}`)}
                    >
                      <TableCell component="th" scope="row">
                        {order._id}
                      </TableCell>
                      <TableCell align="center">
                        {order.createdAt.substring(0, 10)}
                      </TableCell>
                      <TableCell align="center">{order.totalPrice}</TableCell>
                      <TableCell align="center">
                        {order.isPaid ? (
                          order.paidAt
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {order.isDelivered ? (
                          order.deliveredAt
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {orders.length === 0 && (
                <Message style={{ textAlign: "center" }}>
                  You Do Not have any previous orders
                </Message>
              )}
            </TableContainer>
          )}
        </Box>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
