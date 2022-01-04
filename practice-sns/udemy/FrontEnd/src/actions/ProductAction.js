import {
  PRODUCT_LIST_REQUEST,
  PRUDUCT_LIST_SUCCESS,
  PRUDUCT_LIST_FAIL,
} from "../constants/ProductConstants";
import axios from "axios";

const listProducts = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({
      type: PRUDUCT_LIST_SUCCESS,
      plyload: data,
    });
  } catch (error) {
    // 백엔드의 오류를 가져와서 프론트엔드에 표시해줘야한다.
    dispatch({
      type: PRUDUCT_LIST_FAIL,
      plyload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export default listProducts;
