import { connect } from 'react-redux';
import { prop } from 'ramda';
import actionSpreader from '../../futils/actionSpreader';
import Home from './home';

const mapStateToProps = prop('home');

const mapDispatchToProps = dispatch => ({
  fetchLatest: () => dispatch(actionSpreader('FETCH_INIT')),
  loaderOff: () => dispatch(actionSpreader('LOADER_OFF')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
