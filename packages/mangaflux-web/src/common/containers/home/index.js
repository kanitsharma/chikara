import { connect } from 'react-redux';
import actionSpreader from '../../futils/actionSpreader';
import Home from './home'

const mapStateToProps = state => ({
  ...state.home,
});

const mapDispatchToProps = dispatch => ({
  fetchLatest: () => dispatch(actionSpreader('FETCH_LATEST')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
