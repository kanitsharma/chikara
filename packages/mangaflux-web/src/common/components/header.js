import React from 'react';
import { Flex, Text } from '@elementary/components';
import { Link } from 'react-router-dom';

export default () => (
  <Flex flexDirection="row" alignItems="center" justifyContent="flex-start" padding="10px 40px" bg="#1B192C" color="#fff">
    <Text className="header-logo">Mangaflux</Text>
    <Flex flexDirection="row" marginLeft="auto" alignItems="center" justifyContent="space-around">
      <Text className="header-nav" color="#01BCCB" f="18px" padding="0px 30px">
        <Link to="/">Home</Link>
      </Text>
      <Text className="header-nav" color="#01BCCB" f="18px" padding="0px 30px">
        <Link to="/popular">Popular</Link>
      </Text>
      <Text className="header-nav" color="#01BCCB" f="18px" padding="0px 30px">
        <Link to="/browse">Browse</Link>
      </Text>
    </Flex>
  </Flex>
);
