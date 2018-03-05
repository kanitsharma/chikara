import React from 'react';
import { Flex } from '@elementary/components';

export default () => (
  <Flex className="loader-overlay">
    <div className="loader" >
      <div id="largeBox" />
      <div id="smallBox" />
    </div>
  </Flex>
)
