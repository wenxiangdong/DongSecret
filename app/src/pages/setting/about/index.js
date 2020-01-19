import React from 'react';
import styles from './index.module.less';
import logo from '../../../images/logo.png';
import useNavigationBar from '../../../hooks/use-navigation-bar';
import { View, Image } from 'remax/wechat';
import MountedTransition from '../../../components/common/MountedTransition';
import WhiteSpace from '../../../components/common/WhiteSpace';
/**
 *
 */
const NAV_CONFIG = {
  title: '关于'
};
const INFO =
  '这是一款管理自己密码的小程序，只用一个密码将你从一堆复杂的密码中解除出来。原理是将主密码存放在本地，加密方法存放在云端，安全性高。';
export default () => {
  useNavigationBar(NAV_CONFIG);
  return (
    <View className={styles.wrapper}>
      <MountedTransition name="fade-down">
        <Image src={logo} className={styles.logo} />
      </MountedTransition>
      <WhiteSpace />
      <View className={styles.appName}>One Password</View>
      <WhiteSpace height="32px" />
      <View className={styles.info}>{INFO}</View>
      <View className={styles.developer}>@开发者：文向东</View>
    </View>
  );
};
