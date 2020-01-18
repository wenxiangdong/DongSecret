import React, { useMemo } from 'react';
import styles from './index.module.less';
import { View } from 'remax/wechat';
import { COLOR_LIST } from '../../../constants';

const COLORS = [...COLOR_LIST];
/**
 * @param {{
 * tip?: String;
 * }} props
 */
export default ({ tip }) => {
  const colorDots = useMemo(() => {
    const DELAY = 0.1;
    return COLORS.map((color, index) => (
      <View
        key={color}
        className={styles.dot}
        style={{
          animationDelay: DELAY * index + 's',
          backgroundColor: color
        }}
      ></View>
    ));
  }, []);
  return (
    <View className={styles.wrapper}>
      <View>{colorDots}</View>
      {!!tip && <View className={styles.text}>{tip}</View>}
    </View>
  );
};
