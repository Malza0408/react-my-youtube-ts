import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./modules/reducer";
import rootSaga from "./modules/rootSaga";
import history from "../history";
import { routerMiddleware } from "connected-react-router";

const create = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer(history),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, routerMiddleware(history))
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default create;
