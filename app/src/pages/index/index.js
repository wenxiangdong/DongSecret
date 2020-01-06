import * as React from 'react';
import { View, Text, Image, Button } from 'remax/wechat';
import styles from './index.module.less';
import VantIcon from '@vant/weapp/dist/icon';
import Tabbar from '../../Tabbar';


export default (props) => {
  return (
    <Tabbar {...props} />
  );
};
