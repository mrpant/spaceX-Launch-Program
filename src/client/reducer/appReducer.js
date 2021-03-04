import * as type from '../../actionType';

// TODO : Set init values.
const initialState = {
    isLoader: true,
    spaceXList: [],
    isNoResultFound: false
}

// TODO : Application Reducer.
const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case type.GET_SPACE_X_PENDING:
            return {
                ...action
            };
        case type.GET_SPACE_X_SUCCESS:
            return {
                ...action
            };
        case type.GET_SPACE_X_FAILED:
            return {
                ...action
            };

        default:
            return state;
    }
};

export default appReducer;