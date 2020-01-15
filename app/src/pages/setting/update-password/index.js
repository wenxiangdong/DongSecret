import React, { useEffect } from 'react';
import { View, showToast, navigateTo } from 'remax/wechat';
import { ROUTES } from '../../../constants';
import { useContainer } from 'unstated-next';
import { PasswordStore } from '../../../stores/password';
import useLogger from '../../../hooks/use-logger';

export default function(props) {
  const [_, setPassword] = useContainer(PasswordStore);
  const log = useLogger('setting/update-password');
  useEffect(() => {
    setPassword('test');
    log('set password');
  }, []);
  return <View>设置密码</View>;
}

