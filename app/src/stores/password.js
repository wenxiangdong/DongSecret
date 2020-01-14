import { getStorageSync, setStorageSync } from 'remax/wechat';
import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { ONE_PASSWORD_KEY } from '../constants';

const KEY = ONE_PASSWORD_KEY;
/**
 * 全局密码
 */
const password = getStorageSync(KEY) || '';

const usePassword = () => {
  const [state, setState] = useState(password);
  const setStateWithStorage = value => {
    setState(value);
    setStorageSync(KEY, value);
  };
  return [state, setStateWithStorage];
};

export const PasswordStore = createContainer(usePassword);
