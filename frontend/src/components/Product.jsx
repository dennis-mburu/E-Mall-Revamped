import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    // <Card className="my-3 p-3 rounded shadow-xl shadow-slate-400">
    <Card className="product-card">
      <Link to={`/product/${product._id}`}>
        <Card.Img as="img" variant="top" src={product.image} alt={product.name} className="card-image" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            rating={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
