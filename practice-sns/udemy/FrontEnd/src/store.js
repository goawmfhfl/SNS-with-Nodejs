import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import productListReducer from "./reducers/productReducers";

const reducer = combineReducers({
  // reducer에 제품 목록을 넣는 방법이다
  productList: productListReducer,
});

// 그리고 지금은 단지 빈 배열일 뿐입니다. 처음에 그렇게 설정했기 때문입니다.

// 이제 액션이 진행되는 한, 실제로 액션을 시작하기 전에 상수에 대해 이야기하고 싶습니다.
// 그래서 바로 지금, 우리의 경우는 이 문자열이고 당신은 그렇게 유지할 수 있습니다.
// 어떤 사람들은 상수를 사용하지 않지만 일반적으로 이러한 문자열을 변수 안에 넣습니다.
// 상수입니다.
// 따라서 상수는 변경되지 않으며 이 문자열과 동일합니다.
// 이제 Constants라는 소스에 새 폴더를 만들어 보겠습니다.
// 당신의 모든 것, 당신의 모든 경우, 모든 상수.
// 여기에서 Product Constants Dot J.S.라는 파일을 만들겠습니다. 그리고 우리가 이것을 하는 방법
// 그냥 export const이고 잡아봅시다.

// 물론, 변수 이름에 따옴표를 사용하고 싶지는 않지만,

// 문자열을 입력한 다음 성공을 위해 동일한 작업을 수행합니다.

// 그리고 이것은 성공하고 실패할 것입니다.

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
