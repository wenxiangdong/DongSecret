import React, { useEffect, useMemo, useState } from 'react';
import { View, navigateTo, redirectTo, showToast } from 'remax/wechat';
import { useContainer } from 'unstated-next';
import { UserStore } from '../stores/user';
import useAsync from '../hooks/use-async';
import { API } from '../apis';
import AuthLayer from '../components/common/AuthLayer';
import { fromJS } from 'immutable';
import { UserStates, TOAST_DURATION } from '../constants/index';
import { ROUTES } from '../constants';

export default WrappedComponent => props => {
  const [user, setUser] = useContainer(UserStore);
  const [authComplete, setAuthComplete] = useState(user.get('valid'));

  const handleUserStateFns = useMemo(
    () => [
      () =>
        navigateTo({ url: ROUTES.ABOUT({ message: '欢迎使用 One Password' }) }),
      () => {
        redirectTo({
          url: ROUTES.UPDATE_PASSWORD({ message: '请先设置 one password' })
        });
      },
      () => {
        setAuthComplete(true);
      }
    ],
    []
  );

  const {
    result: authResult,
    loading: authLoading,
    error: authError,
    call: authCall
  } = useAsync(API.auth, { autoCall: !user.get('valid') });

  // user 状态
  useEffect(() => {
    handleUserStateFns[user.get('state')]?.();
  }, [user, handleUserStateFns]);

  // 调用结果
  useEffect(() => {
    if (!authError && authResult) {
      setUser(preUser =>
        fromJS({
          ...preUser.toJS(),
          ...authResult.toJS(),
          valid: true
        })
      );
    }
  }, [authResult, authError]);

  return user.get('valid') && authComplete ? (
    <WrappedComponent {...props} />
  ) : (
    <AuthLayer loading={authLoading} error={authError} retry={authCall} />
  );
};
