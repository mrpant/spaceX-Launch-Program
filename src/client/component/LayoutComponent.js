import React, { Component } from 'react';
import FilterComponent from '../atoms/FilterComponent';
import { BOOLEAN, YEAR } from '../model';
import { get } from 'lodash';
import LoadingComponent from '../atoms/LoadingComponent';
import { getParamsFromUrl } from '../../helper/util';
import Helmet from 'react-helmet';

class LayoutComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: {
                year: null,
                isLanding: null,
                isLaunch: null
            }
        }
        this.setFilterOnStateHandler = this.setFilterOnStateHandler.bind(this);
    }

    // TODO : Call api on load.
    loadAPI() {
        const { getSpaceXAPI } = this.props;
        this.setUrlParamsToState((filter) => {
            getSpaceXAPI(filter);
        })

    }

    componentDidMount() {
        this.loadAPI();
    }


    // TODO : Generate url on filter/
    createFilterUrl() {
        let yearUrl = this.state.filter.year ? `/year/${this.state.filter.year}` : '';
        let isLandingUrl = this.state.filter.isLanding ? `/isLanding/${this.state.filter.isLanding}` : '';
        let isLaunchUrl = this.state.filter.isLaunch ? `/isLaunch/${this.state.filter.isLaunch}` : '';
        return '/app' + yearUrl + isLandingUrl + isLaunchUrl;
    }

    // TODO : Set params into state variable.
    setUrlParamsToState(cb) {
        const { location } = this.props;
        const { year, isLaunch, isLanding } = getParamsFromUrl(location.pathname);
        this.setState({ filter: { year, isLaunch, isLanding } }, () => cb({ year, isLaunch, isLanding }));
    }

    // TODO : OnClick Filter Handler.
    setFilterOnStateHandler(e, values, filterType) {
        const { filter } = this.state;
        if (filterType == 'year') filter.year = values;
        if (filterType == 'isLanding') filter.isLanding = values;
        if (filterType == 'isLaunch') filter.isLaunch = values;
        this.setState({ ...this.state }, () => {
            this.props.getSpaceXAPI(this.state.filter);
            const currentUrl = this.createFilterUrl();
            this.props.history.push(currentUrl);
        });
    }


    render() {
        const { isLoader, spaceXList, location } = this.props;
        const { filter } = this.state;
        return (
            <section className="container">
                <Helmet>
                    <title>SpaceX Launch Program</title>
                    <meta name="description" content="SpaceX Launch Program description" />
                </Helmet>
                <section className="left-section">
                    <h2>Filter</h2>
                    <FilterComponent
                        title="Launch Year"
                        list={YEAR}
                        onClickHandler={this.setFilterOnStateHandler}
                        filterType={'year'}
                        selectedItem={get(filter, 'year')}
                    />
                    <FilterComponent
                        title="Successful Launch"
                        list={BOOLEAN}
                        onClickHandler={this.setFilterOnStateHandler}
                        filterType={'isLaunch'}
                        selectedItem={get(filter, 'isLaunch')}
                    />
                    <FilterComponent
                        title="Successful Landing"
                        list={BOOLEAN}
                        onClickHandler={this.setFilterOnStateHandler}
                        filterType={'isLanding'}
                        selectedItem={get(filter, 'isLanding')}
                    />
                </section>
                {isLoader && <LoadingComponent />}
                {this.props.children}
            </section>
        );
    }
}

export default LayoutComponent;