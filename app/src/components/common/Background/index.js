import React from 'react';
import styles from './index.module.less';
import { View } from 'remax/wechat';

export default ({ style, className }) => {
  return (
    <View className={`${styles.wrapper} ${className}`} style={style}>
      <View className={styles.color}></View>
      {Array(4)
        .fill('')
        .map((_, index) => (
          <View
            key={index}
            className={styles.circle}
            style={{
              opacity: 1.0 - index * 0.2,
              transform: `rotate(${90 * index}deg)`
            }}
          />
        ))}
    </View>
  );
};
