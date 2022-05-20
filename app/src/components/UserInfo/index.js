import React from 'react';
import styles from './index.module.less';
import { View, Image } from 'remax/wechat';
import logo from '../../images/logo.png';
// 由于 OpenData 禁用了，所以使用logo代替
export default () => {
  return (
    <View className={styles.card}>
      <Image className={styles.avatar} src={logo} />
      <View className={styles.name}>One Password</View>
    </View>
  );
};
