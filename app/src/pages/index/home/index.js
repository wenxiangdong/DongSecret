import React, { useEffect } from 'react';
import { View, Button } from 'remax/wechat';
import styles from './index.module.less';
import { fromJS } from 'immutable';

export default () => {
    const handleClick = () => {
        
    }
    return (
    <View className={styles.wrapper}>
        <Button onClick={handleClick}>Hello Home</Button>
        
    </View>
    );
}