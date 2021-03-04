import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import routes from '../../routes';
import Layout from '../container/LayoutContainer';

// TODO : Root Component of the app.
class AppComponent extends Component {
    render() {
        return (
            < Switch >
                <Layout >
                    {routes.map(route => <Route key={route.path} {...route} />)}
                </Layout>
            </Switch >
        );
    }
}

export default AppComponent;