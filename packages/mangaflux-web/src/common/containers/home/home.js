import React, { Component } from 'react';
import { Flex, Text, Image } from '@elementary/components';
import Loader from '../../components/fullpageloader';

export default class Home extends Component {
  componentWillMount = () => this.props.fetchLatest()

  render = () => {
    const { latest, baseImg, showLoader } = this.props
    return (
      <Flex flexDirection="column" height="100%" alignItems="center" bg="#1B192C">
        <Text f="30px" color="#FD315B">Latest Mangas</Text>
        <Flex flexDirection="row" flexWrap="wrap" alignItems="center" justifyContent="flex-start" padding="10px 40px">
          {
            latest.map(x => (
              <Image padding="30px" src={`${baseImg}${x.im}`} />
            ))
          }
        </Flex>
        {
          showLoader && <Loader />
        }
      </Flex>
    )
  }
}
