import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/CartAction";

const CartScreen = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty"));
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  // useSelector는 전체 전역에 있는 reducer들을 담고있다.
  // state  // productList: {…}, productDetails: {…}, cart: {…}}
  // state.cart  // cartItems: (4) [{…}, {…}, {…}, {…}]

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return <div>CartScreen</div>;
};

// split을 사용하여
// 인수로 전달한다고 가정해보자
// 뛰어쓰기를 전달했다.
// 뛰어쓰기가 있는 0번째는 뛰어쓰기로부터 왼쪽에 있는 단어들을 의미한다
// 뛰어쓰기가 있는 1번째 부터는 뛰어쓰기로부터 오른쪽에 있는 단어들을 의미한다
// 즉 split("=")[1]의 의미는 =가 있는 문자열 오른쪽의 값을 의미한다 즉 숫자를 가리킨다.

export default CartScreen;
