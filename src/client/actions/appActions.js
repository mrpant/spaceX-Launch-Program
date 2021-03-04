import axios from 'axios';
import * as ACTION_TYPE from '../../actionType';
import { objectToQueryString, setFilterKeys } from '../../helper/util';
import { get } from 'lodash';


// TODO : Action for get spaceX api.
export const getSpaceXAPIAction = (params) =>
    (dispatch) => {
        let url = 'https://api.spaceXdata.com/v3/launches?limit=100';
        if (get(params, 'year') || get(params, 'isLanding') || get(params, 'isLaunch')) url += objectToQueryString(setFilterKeys(params));
        dispatch({ type: ACTION_TYPE.GET_SPACE_X_PENDING, isLoader: true, spaceXList: [], isNoResultFound: false });
        return axios.get(url).then((response) => {
            let dataList = get(response, 'data');
            if (dataList && dataList.length) {
                dispatch({ type: ACTION_TYPE.GET_SPACE_X_SUCCESS, isLoader: false, spaceXList: dataList, isNoResultFound: false });
            } else {
                dispatch({ type: ACTION_TYPE.GET_SPACE_X_FAILED, isLoader: false, spaceXList: [], isNoResultFound: true });
            }
        })
            .catch((err) => {
                dispatch({ type: ACTION_TYPE.GET_SPACE_X_FAILED, isLoader: true, spaceXList: [], isNoResultFound: true });
            });
    };