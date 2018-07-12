import { connect } from "react-redux";
import { pick } from "ramda";
import actionSpreader from "../../futils/actionSpreader";
import Latest from "./latest";

const mapStateToProps = state => ({
  ...pick(["mangaList"], state.home)
});

const mapDispatchToProps = dispatch => ({
  fetchLatest: () => dispatch(actionSpreader("FETCH_INIT")),
  loaderOff: () => dispatch(actionSpreader("LOADER_OFF"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Latest);
