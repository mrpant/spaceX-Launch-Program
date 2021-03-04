import React, { Component } from 'react';
import CardComponent from '../atoms/CardComponent';
import { get } from 'lodash';
import { getLandSuccess } from '../../helper/util';
import Helmet from 'react-helmet';

// TODO : Common Routes on applied filters.
class RightComponent extends Component {

    render() {
        const { spaceXList, isNoResultFound, location } = this.props;
        return (
            <section className="right-section">
                {get(location, 'pathname') !== '/' && <Helmet>
                    <title>Search SpaceX Result</title>
                    <meta name="description" content="SpaceX Launch Program filter description" />
                </Helmet>
                }
                <div className="content-container">
                    {spaceXList && spaceXList.map((item, index) => {
                        return <CardComponent
                            title={`${get(item, 'mission_name')} #${get(item, 'flight_number')}`}
                            mission={get(item, 'mission_id')}
                            key={index}
                            launchYear={get(item, 'launch_year')}
                            isSuccessLaunch={`${get(item, 'launch_success')}`}
                            isSuccessLanding={getLandSuccess(item)}
                            imgUrl={get(item, 'links.mission_patch')}
                        />
                    })
                    }
                    {get(spaceXList, "length") <= 0 && isNoResultFound && <div className="no-result">No Result Found</div>}
                </div>
            </section>
        );
    }
}

export default RightComponent;