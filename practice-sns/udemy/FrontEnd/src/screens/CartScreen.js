import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/CartAction";

const CartScreen = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const qty = Number(searchParams.get("qty"));
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  console.log(cartItems[0].qty);
  // useSelector는 전체 전역에 있는 reducer들을 담고있다.
  // state  // productList: {…}, productDetails: {…}, cart: {…}}
  // state.cart  // cartItems: (4) [{…}, {…}, {…}, {…}]

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = () => {
    console.log("remove");
  };
  const checkoutHandler = () => {
    navigate("/login/?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Yoyr cart is empty<Link to="/">go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map(item => (
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.porduct}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={2}>
                    {" "}
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={e =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value)),
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup className="item">
              <h2>
                Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                item
              </h2>
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup>
          </ListGroup>
          <ListGroup>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.lenrght === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

// split을 사용하여
// 인수로 전달한다고 가정해보자
// 뛰어쓰기를 전달했다.
// 뛰어쓰기가 있는 0번째는 뛰어쓰기로부터 왼쪽에 있는 단어들을 의미한다
// 뛰어쓰기가 있는 1번째 부터는 뛰어쓰기로부터 오른쪽에 있는 단어들을 의미한다
// 즉 split("=")[1]의 의미는 =가 있는 문자열 오른쪽의 값을 의미한다 즉 숫자를 가리킨다.

export default CartScreen;
