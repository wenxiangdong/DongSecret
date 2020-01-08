import React, { useMemo } from 'react';
import { Record, List } from 'immutable';
import { View } from 'remax/wechat';
import styles from './index.module.less';
import { COLOR_LIST } from '../../constants';
import Transition from '@vant/weapp/dist/transition';
import Skeleton from '@vant/weapp/dist/skeleton';

/**
 * 
 * @param {{
 * secret: Record<import("../../index").SecretType>;
 * color?: string;
 * }} props 
 */
export const SecretItem = ({secret, color = COLOR_LIST[0]}) => {
    return (
        <View 
            className={styles.itemWrapper}
            style={{
                backgroundColor: color,
            }}
            >
            <View className={styles.name}>
                {secret.get('name')}
            </View>
            <View className={styles.account}>
                {secret.get('account')}
            </View>
        </View>
    );
}

export const SecretSkeleton = ({loading, children}) => {
    const style = useMemo(() => ({
        backgroundColor: 'white',
    }), []);
    return loading ? (
        <View className={styles.list}>
            <View 
                className={styles.itemWrapper}
                style={style}>
                <Skeleton title row="3" />
            </View>
        </View>
    ) : children;
}

/**
 * 
 * @param {{
 * secretList: List<Record<import('../..').SecretType>>;
 * }} props 
 */
export default function({secretList}) {
    return (
        <View className={styles.list}>
            {secretList.map((item, index) => (
                <View 
                key={index}
                className={styles.slideUpIn}
                style={{margin: '8px auto'}}>
                    <SecretItem secret={item} color={COLOR_LIST[index % COLOR_LIST.length]} />
                </View>
            ))}
        </View>
    );
}