import { useContainer } from 'unstated-next';
import { useCallback } from 'react';
import useAsync from './use-async';
import { API } from '../apis';
import { PasswordStore } from '../stores/password';
import { showToast, navigateTo } from 'remax/wechat';
import { ROUTES } from '../constants';

const goToUpdatePassword = async () => {
  const TIMEOUT = 1000;
  try {
    await showToast({
      title: '即将跳转去设置全局密码',
      icon: 'none',
      duration: TIMEOUT
    });
    setTimeout(() => {
      navigateTo({
        url: ROUTES.UPDATE_PASSWORD()
      });
    }, TIMEOUT);
  } catch (error) {}
};

export default function(password) {
  const [globalPassword] = useContainer(PasswordStore);
  /**
   * 检查是否存在全局本地密码
   * 若无，自动跳转去设置
   */
  const checkIfExistGlobalPassword = useCallback(() => {
    if (!globalPassword) {
      goToUpdatePassword();
      return false;
    }
    return true;
  }, [globalPassword]);
  /**
   * 解码 api 调用
   */
  const decodeApiAsync = useCallback(async () => API.decode(password), [
    password
  ]);

  /**
   * use async
   */
  const { result, loading, error, call } = useAsync(decodeApiAsync, {
    autoCall: false
  });
  /**
   * 向外暴露的解码方法
   */
  const decode = useCallback(async () => {
    if (checkIfExistGlobalPassword()) {
      return call();
    }
  }, [call, checkIfExistGlobalPassword]);

  return {
    decodedPassword: result,
    decoding: loading,
    error,
    decode
  };
}
