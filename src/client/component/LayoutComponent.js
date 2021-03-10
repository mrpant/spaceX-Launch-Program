import React, { Component } from 'react';
import FilterComponent from '../atoms/FilterComponent';
import { LAND_SUCCESS, LAUNCH_SUCCESS, YEAR } from '../model';
import { flatMap, get } from 'lodash';
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
            if (filter.year) {
                this.setToggle(YEAR, filter.year)
            }
            if (filter.isLaunch) {
                this.setToggle(LAUNCH_SUCCESS, filter.isLaunch)
            }
            if (filter.isLanding) {
                this.setToggle(LAND_SUCCESS, filter.isLanding)
            }

            console.log(YEAR, "year", LAUNCH_SUCCESS, "LAU", LAND_SUCCESS);
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

    // TODO : Set Toggle on Load.
    setToggle(items, key) {
        items.filter(x => x.text == key).map(y => y.isToggle = true);
    }

    // TODO : Reset Toggle on Click.
    resetToggle(items, key) {
        items.filter(x => x.text != key).map(y => y.isToggle = false);
    }

    // TODO : OnClick Filter Handler.
    setFilterOnStateHandler(e, values, filterType) {
        const { filter } = this.state;

        // TODO : Filter Type Year.
        if (filterType == 'year') {
            values.isToggle = !values.isToggle;
            if (values.isToggle) {
                filter.year = values.text;
            } else {
                filter.year = '';
            }
            this.resetToggle(YEAR, values.text)
        }

        // TODO : Filter Type isLanding Success.
        if (filterType == 'isLanding') {
            values.isToggle = !values.isToggle;
            if (values.isToggle) {
                filter.isLanding = values.text;
            } else {
                filter.isLanding = '';
            }
            this.resetToggle(LAND_SUCCESS, values.text)
        }
        // TODO : Filter Type isLaunch Success.
        if (filterType == 'isLaunch') {
            values.isToggle = !values.isToggle;
            if (values.isToggle) {
                filter.isLaunch = values.text;
            } else {
                filter.isLaunch = '';
            }
            this.resetToggle(LAUNCH_SUCCESS, values.text)
        }


        this.setState({ ...this.state }, () => {
            this.props.getSpaceXAPI(this.state.filter);
            const currentUrl = this.createFilterUrl();
            this.props.history.push(currentUrl);
        });
    }


    render() {
        const { isLoader } = this.props;
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
                        list={LAUNCH_SUCCESS}
                        onClickHandler={this.setFilterOnStateHandler}
                        filterType={'isLaunch'}
                        selectedItem={get(filter, 'isLaunch')}
                    />
                    <FilterComponent
                        title="Successful Landing"
                        list={LAND_SUCCESS}
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