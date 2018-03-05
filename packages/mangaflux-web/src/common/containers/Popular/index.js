import React from 'react';
import { connect } from 'react-redux';
import { Flex, Text, Image } from '@elementary/components';
import actionSpreader from '../../futils/actionSpreader';

const Home = (props) => {
  return (
    <Flex flexDirection="column" height="100%" alignItems="center" bg="#1B192C">
      <Text f="30px" color="#FD315B">Popular Mangas</Text>
      {/* <Flex flexDirection="row" flexWrap="wrap" alignItems="center" justifyContent="flex-start" padding="10px 40px">
        {
          props.latest.map(x => (
            <Image padding="30px" src={`${props.baseImg}${x.im}`} />
          ))
        }
      </Flex> */}
    </Flex>
  )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
