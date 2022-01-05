import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/CardConstants";

// 썽크를 통해서 동기화를 수행하고 dispatch를 전달한다.
// 제품 목록, 세부정보 또는 장부구니와 같은 모든 정보를 getState로 얻어올 수 있다.
// 그런 다음에는 데이터를 구조화하고 axios를 통해서 얻어오려고한다.
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // 어디에서 실제 아이템 정보를 저장하는가 ? store에서 진행한다.
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
