import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import reducers from "./exploration/reducers";

export const store = createStore(reducers, {}, applyMiddleware(thunk));