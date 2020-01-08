import React, { useEffect } from 'react';
import { View, Button } from 'remax/wechat';
import { fromJS } from 'immutable';
import styles from './index.module.less';
import SecretDetail from '../../../components/SecretDetail';
const secret = fromJS({password: 'password', name: '英雄'});

export default () => {
    const handleClick = () => {
        
    }
    return (
    <View className={styles.wrapper}>
        <SecretDetail secret={secret} />
    </View>
    );
}