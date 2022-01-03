import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Rating from "../components/Rating";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  let { id } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      // 백엔드에서 해당 id값을 가지고 있는 데이터를 가져온다.
      // 기존 find메서드를 적을 필요가 없다. axios를 통해서 해당 id값만 찾아오면 되기 때문이다.
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProducts();
  }, [id]);

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
