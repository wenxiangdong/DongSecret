import React from 'react';
import { View } from 'remax/wechat';
import styles from './index.module.less';
export default ({height = "16px"}) => (<View className={styles.wrapper} style={{height: height}}/>);