import React, { useEffect, useState, useCallback } from 'react';
import { View, Button } from 'remax/wechat';
import styles from './index.module.less';
import { fromJS } from 'immutable';
import SecretListContainer from '../../../containers/SecretListContainer';
import { AddSecret } from '../../../components/SecretList';
import Search from '@vant/weapp/lib/search';
import useLogger from '../../../hooks/use-logger';

export default () => {
  const log = useLogger('index/home');
  const [searchKeyword, setKeyword] = useState('');
  const handleSearch = useCallback(e => {
    log(e);
    setKeyword(e.detail);
  }, []);
  return (
    <View className={styles.wrapper}>
      <Search
        value={searchKeyword}
        bindsearch={handleSearch}
        placeholder="输入关键词找到你的密码项吧"
      />
      <AddSecret />
      <SecretListContainer keyword={searchKeyword} />
    </View>
  );
};
