import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Rating from "../components/Rating";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { listProductDetails } from "../actions/ProductAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, products } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        <Row>
          <Col mb={6}>
            <Image src={products.image} alt={products.name} />
          </Col>
          <Col mb={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{products.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={products.rating}
                  text={`${products.numReviews} Reviews`}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Price: ${products.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${products.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{products.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {products.countInStock > 0 ? "in Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {/* 만약 데이터베이스 안에 있는 물건이 0개라면 Button을 비활성화 시킨다. */}
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={products.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
