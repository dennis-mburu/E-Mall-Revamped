import { Button } from "@mui/material";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

function ProductListScreen() {
  const navigate = useNavigate();

  const {
    data: products,
    isLoading: loadingProducts,
    error,
  } = useGetProductsQuery();
  return (
    <>
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <h3>Products</h3>
        </Col>
        <Col style={{ alignSelf: "end" }}>
          {/* TODO: Make the button float to the rightest end */}
          <Button variant="contained" color="success" size="small">
            <FaEdit style={{ marginRight: "5px" }} />
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingProducts ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message || error.data}</Message>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">NAME</TableCell>
                <TableCell align="center">PRICE</TableCell>
                <TableCell align="center">CATEGORY</TableCell>
                <TableCell align="center">BRAND</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product) => (
                <TableRow
                  hover
                  key={product._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  //   onClick={() => navigate(`/product/${product._id}`)}
                >
                  <TableCell component="th" scope="row">
                    {product._id}
                  </TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">{product.brand}</TableCell>
                  <TableCell align="center" style={{ display: "flex" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ marginRight: "1rem" }}
                    >
                      <FaEdit />
                    </Button>
                    <Button variant="outlined" size="small" color="error">
                      <FaTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {products.length === 0 && (
            <Message style={{ textAlign: "center" }}>
              No Products available
            </Message>
          )}
        </TableContainer>
      )}
    </>
  );
}

export default ProductListScreen;
