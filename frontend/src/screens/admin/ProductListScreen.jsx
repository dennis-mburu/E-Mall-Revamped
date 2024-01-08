import { Button } from "@mui/material";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useCreateNewProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
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
import { toast } from "react-toastify";

function ProductListScreen() {
  const navigate = useNavigate();

  const {
    data: products,
    isLoading: loadingProducts,
    error,
    refetch,
  } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateNewProductMutation();

  const [deleteProduct, { isLoading: LoadingDelete }] =
    useDeleteProductMutation();

  async function handleCreateProduct() {
    if (window.confirm("Are You sure you want to create a new Product?")) {
      try {
        await createProduct().unwrap();
        refetch();
      } catch (error) {
        toast.error(error.data.message || error.data);
      }
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete selected product? ")) {
      try {
        const res = await deleteProduct(id).unwrap();
        toast.success(res.message);
        refetch();
      } catch (error) {
        toast.error(error.data.message || error.data);
      }
    }
  }

  return (
    <>
      {loadingCreateProduct && <Loader />}
      {LoadingDelete && <Loader />}
      <Row className="align-items-center my-3">
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="text-end">
          <Button
            variant="contained"
            color="success"
            size="small"
            disabled={loadingCreateProduct || LoadingDelete}
            onClick={handleCreateProduct}
          >
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
                      disabled={loadingCreateProduct || LoadingDelete}
                      onClick={() => {
                        navigate(`/admin/products/${product._id}/edit`);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      disabled={loadingCreateProduct || LoadingDelete}
                      onClick={() => handleDelete(product._id)}
                    >
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
