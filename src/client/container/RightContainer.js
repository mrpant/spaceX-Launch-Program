
import { connect } from "react-redux";
import RightComponent from "../component/RightComponent";
import * as appAction from '../actions/appActions';

// TODO : Pass action to server props as ref.
RightComponent.serverFetch = appAction.getSpaceXAPIAction;

const mapStateToProps = state => ({
    isLoader: state.appReducer.isLoader,
    spaceXList: state.appReducer.spaceXList,
    isNoResultFound: state.appReducer.isNoResultFound
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RightComponent);
