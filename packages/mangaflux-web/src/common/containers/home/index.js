import React from 'react'
import { connect } from 'react-redux'
import actionSpreader from '../../futils/actionSpreader'

const Home = props => (
  <div>
    <div onClick={props.toggleText}>Toggle Text</div>
    {
      props.showText &&
      <div> Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</div>
    }
    {
      JSON.stringify(props.latest)
    }
  </div>
)

const mapStateToProps = state => ({
  showText: state.home.showText,
  latest: state.latest
})

const mapDispatchToProps = dispatch => ({
  toggleText: () => dispatch(actionSpreader('TOGGLE_TEXT'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)