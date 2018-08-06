import { connect } from 'react-redux';
import Browse from './browse';
import actionSpreader from '../../futils/actionSpreader';

const mapStateToProps = _state => ({});

const mapDispatchToProps = dispatch => ({
  searchManga: text => dispatch(actionSpreader('SEARCH_MANGA', text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Browse);
