import { connect } from "react-redux";
import { prop } from "ramda";
import actionSpreader from "../../futils/actionSpreader";
import Home from "./home";

const mapStateToProps = prop("home");

const mapDispatchToProps = dispatch => ({
  fetchLatest: () => dispatch(actionSpreader("FETCH_INIT"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
