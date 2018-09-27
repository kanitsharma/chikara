import { connect } from 'react-redux';
import { pick } from 'ramda';
import Info from './info';

const mapStateToProps = state => ({
  ...state.info,
  ...pick(['showLoader'], state.home),
});

const mapDispatchToProps = dispatch => ({
  fetchInfo: id => dispatch({ type: 'FETCH_INFO', payload: id }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Info);
