import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import routes from '../../routes';
import Layout from '../container/LayoutContainer';

// TODO : Root Component of the app.
class AppComponent extends Component {
    render() {
        return (
            < Switch >
                <Redirect exact={true} from="/" to="/app" />
                <Layout >
                    {routes.map(route => <Route key={route.path} {...route} />)}
                </Layout>
            </Switch >
        );
    }
}

export default AppComponent;