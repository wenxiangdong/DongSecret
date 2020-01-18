import React, { useEffect } from 'react';
import { View } from 'remax/wechat';
import { useContainer } from 'unstated-next';
import { UserStore } from '../stores/user';
import useAsync from '../hooks/use-async';
import { API } from '../apis';
import AuthLayer from '../components/common/AuthLayer';
import { fromJS } from 'immutable';

export default WrappedComponent => props => {
  const [user, setUser] = useContainer(UserStore);

  const {
    result: authResult,
    loading: authLoading,
    error: authError,
    call: authCall
  } = useAsync(API.auth, { autoCall: !user.get('valid') });

  useEffect(() => {
    if (!authError && authResult) {
      setUser(
        fromJS({
          ...user.toJS(),
          ...authResult.toJS(),
          valid: true
        })
      );
    }
  }, [authResult, authError]);

  return user.get('valid') ? (
    <WrappedComponent {...props} />
  ) : (
    <AuthLayer loading={authLoading} error={authError} retry={authCall} />
  );
};
