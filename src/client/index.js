import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import createStore from '../store';
import "../theme/App.css";
import App from "./component/AppComponent";

// TODO : Update initial values on store.
const store = createStore(window.REDUX_DATA);

const jsx = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

// TODO : Process for rehydrate
const app = document.getElementById("app");
ReactDOM.hydrate(jsx, app);
