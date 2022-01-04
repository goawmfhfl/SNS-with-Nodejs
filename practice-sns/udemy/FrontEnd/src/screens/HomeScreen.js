import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";

import listProducts from "../actions/ProductAction";

// 1 useEffect를 통해서 listProducts에 있는 reducer를 dispatch를 통해 불러온다
// 2.useSelect를 통해서 불러온 데이터 중에서 사용하려는 객체를 고른다
// 3.구조분해 할당을 통해서 객체안에서 사용하려는 요소들을 불러온 후에 프론트엔드 작업을 한다.

const HomeScreen = () => {
  const dispatch = useDispatch();
  // useSelector를 통해서 state 즉 store를 검색했고
  // reducer함수에 할당되어있는 즉 전역에 있는 state객체중에서 productList를 조회하는 것이다
  // 지금 이렇게 조회가 가능한 이유는 reducer로 선언함으로써 전역객체가 되었기 때문이다.
  const productList = useSelector(state => state.productList);

  // productReducers의 반환값들을 보면 어떤 key값들을 가지고 있는지 알 수 있다.
  const { loading, error, products } = productList;
  useEffect(() => {
    // 전에하던 백엔드에서의 데이터 요청과 동일한 일을 진행하는 것이다
    // 화면이 업로드 되기전에 데이터를 불러와야지 프론트엔드 화면에 뿌려줄 수 있다.

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
