import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useCreateProductReviewMutation,
  useGetProductByIdQuery,
} from "../slices/productsApiSlice";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  ListGroupItem,
  FormSelect,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
// import Meta from "../components/Meta";

function ProductScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createProductReview, { isLoading: loadingCreateReview }] =
    useCreateProductReviewMutation();

  function addToCartHandler() {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await createProductReview({
        productId,
        rating,
        comment,
      }).unwrap();
      setComment("");
      setRating(null);
      refetch();
      toast.success(res.message);
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
      {/* <Meta title={product.name} description={product.description} /> */}
      <LinkContainer to="/" className="my-3">
        <Button variant="contained">Go Back</Button>
      </LinkContainer>

      {/* <Link to="/" className="btn btn-light my-3" >Go back</Link> */}
      <Row>
        <Col md={4}>
          <Image src={product.image} alt={product.name} fluid thumbnail />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>{product.name}</ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                text={`${product.numReviews} Ratings`}
              />
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col>Price: </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroupItem>

              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <FormSelect
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormSelect>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroupItem>
                <Button
                  variant="contained"
                  disabled={product.countInStock === 0}
                  fullWidth
                  // className="w-full bg-blue-600 disabled:text-slate-400"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col className="my-3" md={6}>
          <h4>Write a Customer Review</h4>
          {loadingCreateReview && <Loader />}
          {userInfo ? (
            <Box component="form" onSubmit={handleSubmit}>
              <FormControl
                sx={{ my: 2 }}
                fullWidth
                variant="filled"
                size="small"
              >
                <InputLabel id="rating">Rating</InputLabel>
                <Select
                  labelId="rating"
                  required
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <MenuItem value={1}>1 - Poor</MenuItem>
                  <MenuItem value={2}>2 - Fair</MenuItem>
                  <MenuItem value={3}>3 - Good</MenuItem>
                  <MenuItem value={4}>4 - Very Good</MenuItem>
                  <MenuItem value={5}>5 - Excellent</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant="standard"
                type="text"
                // margin="normal"
                required
                fullWidth
                name="comment"
                label="Comment"
                id="comment"
                autoComplete="comment"
                size="small"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                disabled={loadingCreateReview}
                variant="contained"
                sx={{ my: 2 }}
                type="submit"
              >
                Post Review
              </Button>
            </Box>
          ) : (
            <Message>
              Please <Link to="/login">Log In</Link> to Post reviews
            </Message>
          )}

          <h3 style={{ textAlign: "center" }}>All Reviews</h3>
          {product.reviews.length === 0 && (
            <Message>There are currently no reviews for this product</Message>
          )}
          <ListGroup variant="flush">
            {product.reviews.map((review) => (
              <ListGroupItem key={review._id}>
                <strong>{review.name}</strong>
                <Rating rating={review.rating}></Rating>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default ProductScreen;
