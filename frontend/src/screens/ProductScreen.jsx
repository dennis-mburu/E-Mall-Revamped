import React from "react";
import {  useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import products from "../products";
import Rating from "../components/Rating";
import { LinkContainer } from "react-router-bootstrap";

function ProductScreen() {
  const { id: productId } = useParams();
  const product = products.find((product) => product._id === productId);
  console.log(product.image);
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
            <ListGroup >
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
              <ListGroupItem>
                <Button
                  type="button"
                  variant="primary"
                  className="w-full bg-blue-600"
                  disabled={product.countInStock === 0}
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
