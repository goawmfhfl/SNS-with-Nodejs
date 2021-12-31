import React from "react";
import { Card } from "react-bootstrap";
// Product의 부모 컴포넌트 HomeScreen을 통해서
// product props를 전달받는다.
const Product = ({ product }) => {
  return (
    <div>
      <Card style={{ width: "18rem" }} className="my-3 p-3 rounded">
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </a>
        <Card.Body>
          <a href={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </a>

          <Card.Text as="div">
            <div className="my-3">
              {product.rating} from {product.numReviews} reviews
            </div>
          </Card.Text>

          <Card.Text as="h3">${product.sign}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

// my-3 mrgin top & Bottom을 의미한다.

export default Product;
