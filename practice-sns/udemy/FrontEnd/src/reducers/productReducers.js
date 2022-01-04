import {
  PRODUCT_LIST_REQUEST,
  PRUDUCT_LIST_SUCCESS,
  PRUDUCT_LIST_FAIL,
} from "../constants/ProductConstants";
const productReducer = (state = {}, action) => {
  switch (action.type) {
    //   하나는 우리가 실제로 요청을 했을 때의 제품 목록 요청입니다.
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    //  응답에 성공하면 페이로드를 통해서 products의 정보들이 받아질 것이다.
    case PRUDUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    // 응답에 실패하면 오류를 전송한다.
    case PRUDUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
