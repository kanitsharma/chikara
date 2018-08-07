import { connect } from 'react-redux';
import { pick } from 'ramda';
import actionSpreader from '../../futils/actionSpreader';
import Chapter from './chapter';

const mapStateToProps = state => ({
  ...pick(['images'], state.chapter),
  ...pick(['showLoader'], state.home),
});

const mapDispatchToProps = dispatch => ({
  fetchChapter: id => dispatch(actionSpreader('FETCH_CHAPTER', id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chapter);
