import React, { useEffect } from 'react';
import { showToast } from 'remax/wechat';
import useLogger from '../hooks/use-logger';

export default Component => props => {
  const log = useLogger('use-toast', { auto: false });
  useEffect(() => {
    const message = props?.location?.query?.message;
    log(props.query);
    if (!!message) {
      showToast({
        title: message,
        icon: 'none'
      });
    }
  }, []);
  return <Component {...props} />;
};
