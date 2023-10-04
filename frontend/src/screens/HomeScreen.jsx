import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";

function HomeScreen() {

  // const {data: products, isLoading, isFetching, isError, error} = useGetProductsQuery()

  
  const res = useGetProductsQuery()
  console.log(res)
  if (res.isLoading) return <h1>Loading...</h1>
  if (res.error) return <h1>{res.error.data.message || res.error.data}</h1>

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center m-3">
        Latest Products
      </h1>
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
