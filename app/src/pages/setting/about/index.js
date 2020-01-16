import React from 'react';
import useNavigationBar from '../../../hooks/use-navigation-bar';
import { View } from 'remax/wechat';
/**
 *
 */
const NAV_CONFIG = {
  title: '关于'
};
export default () => {
  useNavigationBar(NAV_CONFIG);
  return <View>about</View>;
};
