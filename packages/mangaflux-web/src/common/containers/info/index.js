import { connect } from 'react-redux';
import { prop } from 'ramda';
import actionSpreader from '../../futils/actionSpreader';
import Info from './info';

const mapStateToProps = prop('home');

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
