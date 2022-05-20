import React, { useMemo } from 'react';
import styles from './index.module.less';
import { showToast, View } from 'remax/wechat';
import PasswordInput from '../../PasswordInput';
import { PasswordStore } from '../../../stores/password';
import useLogger from '../../../hooks/use-logger';

/**
 * @param {{
 * onUnLock: Function;
 * }} props
 */
export default ({ onUnLock }) => {
  const log = useLogger('LockScreen', { auto: false });
  const [password] = PasswordStore.useContainer();
  /**
   * 密码输入完成
   * @param {String} value
   */
  const handleCompleteInputPassword = value => {
    log(value, password);
    if (value === password) {
      onUnLock();
    } else {
      showToast({
        title: '密码错误',
        icon: 'none'
      });
    }
  };
  return (
    <View className={styles.container}>
      <View className={styles.title}>请输入你的 One Password 以解锁</View>
      <PasswordInput onComplete={handleCompleteInputPassword} />
    </View>
  );
};
