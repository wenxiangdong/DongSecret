import React from 'react';
import { View, showToast, navigateTo } from 'remax/wechat';
import { ROUTES } from '../../../constants';

export default function(props) {
    return (
        <View>设置密码</View>
    );
}

export const goToUpdatePassword = async () => {
    const TIMEOUT = 1000;
    try {
        await showToast({
            title: '即将跳转去设置全局密码',
            icon: 'none',
            duration: TIMEOUT,
        });
        setTimeout(() => {
            navigateTo({
                url: ROUTES.UPDATE_PASSWORD,
            });
        }, TIMEOUT);
    } catch (error) {
        
    }
    
}