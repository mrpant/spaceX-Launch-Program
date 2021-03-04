
import { connect } from "react-redux";
import LayoutComponent from "../component/LayoutComponent";
import * as appAction from '../actions/appActions';
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
    isLoader: state.appReducer.isLoader,
    spaceXList: state.appReducer.spaceXList
});

const mapDispatchToProps = (dispatch) => ({
    getSpaceXAPI: (params = null) => {
        dispatch(appAction.getSpaceXAPIAction(params));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LayoutComponent));
