import React, { useEffect } from 'react';
import { View, Button } from 'remax/wechat';
import styles from './index.module.less';
import { fromJS } from 'immutable';
import SecretListContainer from '../../../containers/SecretListContainer';
import { AddSecret } from '../../../components/SecretList';

export default () => {
    const handleClick = () => {
        
    }
    return (
    <View className={styles.wrapper}>
        <AddSecret />
        <SecretListContainer />
    </View>
    );
}