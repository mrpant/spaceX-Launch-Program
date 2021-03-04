import express from "express";
import path from "path";
import React from "react";
import serverHtmlTemplate from '../helper/server-template';
import Helmet from "react-helmet";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider } from "react-redux";
import createStore from '../store';
import App from "../client/component/AppComponent";
import routes from "../routes";
import { getParamsFromUrl } from "../helper/util";
import { get } from 'lodash';

// TOOD : Get ref of express in app for globel use.
const app = express();
// TODO : Port not setted in .env then default port will be 3000.
const PORT = process.env.PORT || 9934;

// TODO : Get build file from dir.
app.use(express.static(path.resolve(__dirname, "../../build")));

// TODO : Common Request Handler.
app.get("/*", (req, res) => {
    const { params } = req;
    let inputParams = {};
    // TODO : Get filter params.
    if (params) inputParams = getParamsFromUrl(params[0]);
    let context = {};
    // TODO : Create store.
    let store = createStore();

    // TODO : Get routes promises on change every request.
    const routesPromis = routes
        .filter(route => {
            return matchPath(req.url, route);
        })
        .map(route => {
            return route.component;
        })
        .filter(comp => {
            return comp.serverFetch;
        })
        .map(comp => {
            return store.dispatch(comp.serverFetch(inputParams));
        });

    // TODO : Resolve routes promis.
    Promise.all(routesPromis).then((data) => {
        let jsx = (
            <Provider store={store}>
                <StaticRouter context={context} location={req.url}>
                    <App />
                </StaticRouter>
            </Provider>
        );

        // TODO : Get Store State.
        const reduxState = store.getState();

        // TODO : Parse JSX to string to render in client side.
        const reactDOM = renderToString(jsx);
        // TODO : Helmet to render all head section stuff on client side for SEO.
        const helmetData = Helmet.renderStatic();
        res.writeHead(200, { "Content-Type": "text/html" });
        // TOOD : Send Result to client.
        return res.end(serverHtmlTemplate(reactDOM, reduxState, helmetData))
    });
});

// TODO : Set Port to Server.
app.listen(PORT, () => {
    console.log("Server is Running on port", PORT)
});