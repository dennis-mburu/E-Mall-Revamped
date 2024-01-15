import React from "react";
import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import Message from "./Message";

function ProductsCarousel() {
  const {
    data: products,
    isLoading: loadingCarousel,
    error,
  } = useGetTopProductsQuery();

  if (loadingCarousel) return null;

  if (error)
    return (
      <Message variant="danger">{error.data.message || error.data}</Message>
    );

  return (
    <Carousel pause="hover" className="bg-primary my-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <div className="img-container">
              <img
                className="carousel-image"
                src={product.image}
                alt={product.name}
              />
              {/* <h3>{product.description}</h3> */}
            </div>
            {/* <Image src={product.image} alt={product.name} fluid></Image> */}
          </Link>
          <Carousel.Caption>
            <h2>
              {product.name} (${product.price})
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductsCarousel;
