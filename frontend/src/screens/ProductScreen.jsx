import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../slices/productsApiSlice";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  FormSelect,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";

function ProductScreen() {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  if (isLoading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">{error.data.message || error.data}</Message>
    );

  return (
    <>
      <LinkContainer to="/" className="my-3">
        <Button variant="primary">Go Back</Button>
      </LinkContainer>

      {/* <Link to="/" className="btn btn-light my-3" >Go back</Link> */}
      <Row>
        <Col md={3}>
          {/* <Image src={require(`${product.image}`) } alt={product.name}  /> */}
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={5}>
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
                  type="button"
                  variant="primary"
                  disabled={product.countInStock === 0}
                  className="w-full bg-blue-600 disabled:text-slate-400"
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductScreen;
