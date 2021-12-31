import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import productsData from "../products";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {productsData.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

// The Bootstrap grid system has four classes:
// xs (for phones - screens less than 768px wide)
// sm (for tablets - screens equal to or greater than 768px wide)
// md (for small laptops - screens equal to or greater than 992px wide)
// lg (for laptops and desktops - screens equal to or greater than 1200px wide)

export default HomeScreen;
