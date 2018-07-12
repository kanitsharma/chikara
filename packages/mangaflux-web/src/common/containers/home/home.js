import React from 'react'
import { lifecycle } from 'recompose'
import Latest from '../latest'
import './home.css'
import Loader from '../../components/loader'

const withInitData = lifecycle({
  componentDidMount() {
    this.props.fetchLatest()
  }
})

const Home = props => (
  <div className="home_container">
    <div className="nav_container">
      <div className="nav_left">Mangaflux</div>
      <div className="nav-menu">
        <div>HOME</div>
        <div>BROWSE</div>
        <div>ABOUT</div>
      </div>
    </div>
    <Latest />
    {props.showLoader && <Loader />}
  </div>
)

export default withInitData(Home)
