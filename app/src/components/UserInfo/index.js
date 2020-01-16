import React from 'react';
import styles from './index.module.less';
import { View, OpenData } from 'remax/wechat';
export default () => {
  return (
    <View className={styles.card}>
      <View className={styles.avatar}>
        <OpenData type="userAvatarUrl" className={styles.avatar} />
      </View>
      <View className={styles.name}>
        <OpenData type="userNickName" />
      </View>
    </View>
  );
};
