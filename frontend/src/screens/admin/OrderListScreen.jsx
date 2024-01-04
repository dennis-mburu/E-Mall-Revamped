import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useGetAllOrdersQuery } from "../../slices/orderApiSlice";
import Message from "../../components/Message";
import { FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

function OrderListScreen() {
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading: loadingOrders,
    error,
  } = useGetAllOrdersQuery();

  return (
    <>
      <Typography component="h1" variant="h4" sx={{ textAlign: "center" }}>
        All Orders
      </Typography>
      {loadingOrders ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message || error.data}</Message>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">USER</TableCell>
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
                  key={order.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  <TableCell component="th" scope="row">
                    {order._id}
                  </TableCell>
                  <TableCell align="center">{order.user.name}</TableCell>
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
              No Orders available
            </Message>
          )}
        </TableContainer>
      )}
    </>
  );
}

export default OrderListScreen;
