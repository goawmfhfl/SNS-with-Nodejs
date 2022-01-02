import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
// Product의 부모 컴포넌트 HomeScreen을 통해서
// product props를 전달받는다.

// a태그를 사용하면 SPA로 동작하지 않는다
// 그렇기 떄문에 Link태그를 사용해야한다.
// reload가 발생하지 않는다.

const Product = ({ product }) => {
  return (
    <div>
      <Card style={{ width: "18rem" }} className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            ></Rating>
          </Card.Text>

          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

// my-3 mrgin top & Bottom을 의미한다.

export default Product;
