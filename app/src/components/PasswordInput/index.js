import React, { useState, useCallback, useEffect } from 'react';
import { View, Input } from 'remax/wechat';
import styles from './index.module.less';
import useLogger from '../../hooks/use-logger';
import MountedTransition from '../common/MountedTransition';

/**
 * @param {{
 * length?: String;
 * onComplete?: (value: String) => void;
 * initValue?: String;
 * }} props
 */
export default ({ length = 6, onComplete, initValue }) => {
  const log = useLogger('PasswordInput');
  const [password, setPassword] = useState(
    !!initValue ? initValue.split('') : Array(length).fill('')
  );
  const [cursor, setCursor] = useState(0);

  const handleInput = useCallback((e, index) => {
    const value = e.detail.value;
    setPassword(prePassword => {
      log(e, index, prePassword);
      prePassword.splice(index, 1, value);
      return [...prePassword];
    });
    setCursor(value === '' ? index : index + 1);
  }, []);

  /**
   * 所有位数填好后要触发onComplete
   */
  useEffect(() => {
    const allBitsValid = password.every(bit => bit !== '');
    if (allBitsValid) {
      onComplete?.(password.join(''));
    }
  }, [password]);

  return (
    <View className={styles.wrapper}>
      {Array(length)
        .fill('')
        .map((_, index) => (
          <MountedTransition
            key={index}
            show
            name="fade-up"
            duration="500"
            style={{ transitionDelay: index * 150 + 'ms' }}
          >
            <View className={styles.inputWrapper}>
              <Input
                focus={cursor === index}
                value={password[index]}
                className={styles.input}
                type="number"
                maxlength={1}
                bindinput={e => handleInput(e, index)}
              />
            </View>
          </MountedTransition>
        ))}
    </View>
  );
};
