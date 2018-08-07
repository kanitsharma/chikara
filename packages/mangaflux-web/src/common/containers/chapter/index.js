import { connect } from 'react-redux';
import { prop } from 'ramda';
import actionSpreader from '../../futils/actionSpreader';
import Chapter from './chapter';

const mapStateToProps = prop('chapter');

const mapDispatchToProps = dispatch => ({
  fetchChapter: id => dispatch(actionSpreader('FETCH_CHAPTER', id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chapter);
