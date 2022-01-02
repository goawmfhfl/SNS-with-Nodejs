import React from "react";
import { useParams, Link } from "react-router-dom";
import Rating from "../components/Rating";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import productData from "../products";

const ProductScreen = () => {
  let { id } = useParams();
  const product = productData.find(p => p._id === id);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        go Back
      </Link>
      <Row>
        <Col mb={6}>
          <Image src={product.image} alt={product.name} />
        </Col>
        <Col mb={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {/* 상태에 따라서 보여줄 텍스트 값을 정할 수 있다.*/}
                    {product.countInStock > 0 ? "in Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* 만약 데이터베이스 안에 있는 물건이 0개라면 Button을 비활성화 시킨다. */}
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
