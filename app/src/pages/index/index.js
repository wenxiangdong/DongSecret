import * as React from 'react';
import { View, Text, Image, Button } from 'remax/wechat';
import styles from './index.module.less';
import VantIcon from '@vant/weapp/dist/icon';
import Tabbar from '../../Tabbar';
import withAuth from '../../hocs/with-auth';

const Index = props => {
  return <Tabbar {...props} />;
};

export default withAuth(Index);
