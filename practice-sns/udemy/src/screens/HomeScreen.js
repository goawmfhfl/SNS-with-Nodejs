import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  // useEffect를 사용하면
  // 백엔드에 있는 데이터가 바로 불러와진다 !

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      // console.log(`data :`, data);
      // 빈 배열에 백엔드에서 불러온 데이터를 넣어준다.
      // 상태 변경을 위해 정의한 것이다.
      // products는 빈 배열이였지만
      // setProducts에 백엔드에서 불러온 값을 인자로 넣어줌으로써
      // 데이터가 추가되었다.
      setProducts(data);
    };
    fetchProducts();
    // 변경될 때 사용 효과를 헤제하려는 것
    // 값이 변경될 때마다 호출이 되기를 바람
  }, []);
  // products는 상태가 변경되었다 ㅎㅎ
  // console.log("products: ", products);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
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
