import React from 'react';
import { connect } from 'react-redux';
import { Flex, Text } from '@elementary/components'
import actionSpreader from '../../futils/actionSpreader';

const Home = (props) => {
  props.fetchLatest()
  return (
    <Flex flexDirection="column" height="100%" alignItems="center" bg="#1B192C">
      <Text f="30px" color="#FD315B">Latest Mangas</Text>
      {
        JSON.stringify(props.latest)
      }
    </Flex>
  )
}

const mapStateToProps = state => ({
  latest: state.home.latest
});

const mapDispatchToProps = dispatch => ({
  fetchLatest: () => fetch('https://mangaflux-api.herokuapp.com/latest/0/20')
    .then(x => x.json())
    .then(x => dispatch(actionSpreader('LATEST', x))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
