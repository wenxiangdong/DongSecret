import { useAppEvent } from '@remax/macro';
import React, { useEffect, useState } from 'react';
import { useContainer } from 'unstated-next';
import LockScreen from '../components/common/LockScreen';
import { UserStates } from '../constants';
import useLogger from '../hooks/use-logger';
import { UserStore } from '../stores/user';

export default Component => props => {
  const [user, setUser] = useContainer(UserStore);
  const [locked, setLocked] = useState(false);
  const log = useLogger('with-lock-screen', { auto: false });

  useEffect(() => {
    if (user.get('state') === UserStates.NORMAL) {
      setLocked(true);
    }
  }, [user]);

  useAppEvent('onHide', () => {
    if (user.get('state') === UserStates.NORMAL) {
      setLocked(true);
    }
  });

  return locked ? (
    <LockScreen onUnLock={() => setLocked(false)} />
  ) : (
    <Component {...props} />
  );
};
