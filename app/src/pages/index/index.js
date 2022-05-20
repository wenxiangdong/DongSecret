import * as React from 'react';
import { View, Text, Image, Button } from 'remax/wechat';
import styles from './index.module.less';
import VantIcon from '@vant/weapp/lib/icon';
import Tabbar from '../../Tabbar';
import withAuth from '../../hocs/with-auth';
import compose from '../../utils/compose';
import withLockScreen from '../../hocs/with-lock-screen';

const Index = props => {
  return <Tabbar {...props} />;
};

export default compose(withAuth)(Index);
