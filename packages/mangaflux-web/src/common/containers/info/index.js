import { connect } from 'react-redux';
import { prop } from 'ramda';
import Info from './info';

const mapStateToProps = prop('home');

const mapDispatchToProps = _dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Info);
