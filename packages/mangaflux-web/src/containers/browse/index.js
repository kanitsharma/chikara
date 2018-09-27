import { connect } from 'react-redux';
import { pick } from 'ramda';
import Browse from './browse';
import actionSpreader from '../../futils/actionSpreader';

const mapStateToProps = state => ({
  ...pick(['fetchedManga', 'smallLoader', 'notFound'], state.browse),
});

const mapDispatchToProps = dispatch => ({
  searchManga: text => dispatch(actionSpreader('SEARCH_MANGA', text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Browse);
