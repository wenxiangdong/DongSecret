import React, { useMemo } from 'react';
import styles from './index.module.less';
import { View, Image } from 'remax/wechat';
import logo from '../../../images/logo.png';
import Icon from '@vant/weapp/dist/icon';
import Button from '@vant/weapp/dist/button';
import MountedTransition from '../MountedTransition';
import Loading from '../Loading';
import WhiteSpace from '../WhiteSpace';

/**
 * @param {{
 * loading: Boolean;
 * error?: Error;
 * retry?: Function;
 * }}
 */
export default ({ loading = true, error = undefined, retry }) => {
  const loadingElement = useMemo(() => {
    return <Loading tip="正在检查用户状态" />;
  }, []);
  const errorElement = useMemo(() => {
    const message = `失败了，${error?.message + ','}请重试`;
    return (
      <>
        <View>
          <Icon name="warning-o" />
          {message}
        </View>
        {!!retry && (
          <View>
            <Button plain bindclick={retry} block>
              重试
            </Button>
          </View>
        )}
      </>
    );
  }, [retry]);
  return (
    <View className={styles.wrapper}>
      <MountedTransition name="fade-down">
        <Image src={logo} className={styles.logo} />
      </MountedTransition>
      <WhiteSpace height="32px" />
      <View className={styles.content}>
        {!!error ? errorElement : loadingElement}
      </View>
    </View>
  );
};
