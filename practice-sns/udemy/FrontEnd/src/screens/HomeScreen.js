import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { listProducts } from "../actions/ProductAction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Products</h1>
      {/* 로딩중일 경우 Loading 메세지 프론트에 표시 */}
      {loading ? (
        <Loader />
      ) : // 에러발생시 error 메세지 프론트에 표시
      error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        // 로딩이 끝나고 에러가 아닐시에 정상적으로 product 페이지 업로드
        <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

// The Bootstrap grid system has four classes:
// xs (for phones - screens less than 768px wide)
// sm (for tablets - screens equal to or greater than 768px wide)
// md (for small laptops - screens equal to or greater than 992px wide)
// lg (for laptops and desktops - screens equal to or greater than 1200px wide)

export default HomeScreen;
