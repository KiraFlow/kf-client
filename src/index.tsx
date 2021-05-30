import ReactDOM from 'react-dom';
import { App } from './App';
import './main.css';
import {store} from "./state";
import {Provider} from "react-redux";

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
