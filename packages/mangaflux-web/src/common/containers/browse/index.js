import { connect } from 'react-redux';
import { prop } from 'ramda';
import Browse from './browse';

const mapStateToProps = prop('');

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
