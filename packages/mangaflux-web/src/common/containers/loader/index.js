import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'ramda';
import './loader.css';

const Loader = ({ showLoader }) =>
  showLoader ? (
    <div className="loader-overlay">
      <div className="lds-dual-ring" />
    </div>
  ) : (
    <div />
  );

const mapStateToProps = state => ({
  ...pick(['showLoader'], state.home),
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loader);
