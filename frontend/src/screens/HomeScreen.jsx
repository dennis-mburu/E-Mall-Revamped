import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductsCarousel from "../components/ProductsCarousel";

function HomeScreen() {
  // const {data: products, isLoading, isFetching, isError, error} = useGetProductsQuery()

  const res = useGetProductsQuery();
  if (res.isLoading) return <Loader />;
  if (res.error)
    return (
      <Message variant="danger">
        {res.error.data.message || res.error.data}
      </Message>
    );

  return (
    <>
      {/* <div style={{ width: "75%", marginInline: "auto" }}> */}
      <ProductsCarousel />
      {/* </div> */}
      <h1 className="main-heading">Latest Products</h1>
      <Row>
        {/* {products?.map((product) => ( */}
        {res.data.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
