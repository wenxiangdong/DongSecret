import React, { useEffect } from 'react';
import { View, Button } from 'remax/wechat';
import styles from './index.module.less';
import SecretItem from '../../../components/index/SecretItem';
import { fromJS } from 'immutable';
const secret = fromJS({password: 'password', name: '英雄'});

export default () => {
    const handleClick = () => {
        
    }
    return (
    <View className={styles.wrapper}>
        <Button onClick={handleClick}>Hello Home</Button>
        <SecretItem secret={secret} />
    </View>
    );
}