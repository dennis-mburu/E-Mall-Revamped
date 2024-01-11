import {
  Container,
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

function ProductEditScreen() {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const {
    data: product,
    isLoading: loadingProduct,
    error,
    refetch,
  } = useGetProductByIdQuery(productId);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadImage, { isLoading: loadingImage }] =
    useUploadProductImageMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        brand,
        category,
        description,
        price,
        countInStock,
        image,
      }).unwrap();
      refetch();
      toast.success("Product Successfully Updated");
      navigate(-1);
    } catch (error) {
      toast.error(error.data.message || error.data);
    }
  }

  async function uploadFileHandler(e) {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setImage(res.image);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.message || error.data);
    }
  }

  if (loadingProduct) return <Loader />;

  if (error)
    return (
      <Message variant="danger">{error.data.message || error.data}</Message>
    );

  return (
    <Container component="main" maxWidth="md">
      {loadingUpdate && <Loader />}
      {loadingImage && <Loader />}
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          //   px: 4,
          py: 4,
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Edit Product</h3>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "75%" }}>
          <TextField
            variant="standard"
            type="text"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            id="name"
            autoComplete="name"
            // size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="standard"
            type="text"
            margin="normal"
            required
            fullWidth
            name="brand"
            label="Brand"
            id="brand"
            autoComplete="brand"
            size="small"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <TextField
            variant="standard"
            type="text"
            margin="normal"
            required
            fullWidth
            name="category"
            label="Category"
            id="category"
            autoComplete="category"
            size="small"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            variant="standard"
            type="text"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            id="description"
            autoComplete="description"
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* <FormControl component="fieldset" variant="standard"> */}
          {/* <FormLabel component="legend">Image</FormLabel> */}
          <FormGroup>
            <TextField
              variant="standard"
              type="text"
              margin="normal"
              // required
              fullWidth
              name="imageURL"
              label="image URL"
              id="imageURL"
              autoComplete="imageURL"
              size="small"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <TextField
              size="small"
              variant="standard"
              type="file"
              margin="normal"
              name="image"
              onChange={uploadFileHandler}
            />
          </FormGroup>
          {/* </FormControl> */}

          <TextField
            variant="standard"
            type="number"
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            id="price"
            autoComplete="price"
            size="small"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            variant="standard"
            type="number"
            margin="normal"
            required
            fullWidth
            name="countInStock"
            label="Count In Stock"
            id="countInStock"
            autoComplete="countInStock"
            size="small"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
          <Button
            disabled={loadingUpdate}
            variant="contained"
            sx={{ mt: 2 }}
            type="submit"
          >
            Update Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductEditScreen;
