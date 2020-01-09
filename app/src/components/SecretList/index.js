import React, { useMemo, useEffect, useRef, useCallback } from 'react';
import { Record, List } from 'immutable';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.module.less';
import { COLOR_LIST, ROUTES } from '../../constants';
import Transition from '@vant/weapp/dist/transition';
import Skeleton from '@vant/weapp/dist/skeleton';
import Icon from '@vant/weapp/dist/icon';
import Button from '@vant/weapp/dist/button';
import { useContainer } from 'unstated-next';
import { SecretsStore } from '../../stores/secrets';

/**
 * 
 * @param {{
 * secret: Record<import("../../index").SecretType>;
 * color?: string;
 * }} props 
 */
export const SecretItem = ({secret, color = COLOR_LIST[0]}) => {
    const handleClickMore = useCallback(
        () => navigateTo({url: ROUTES.SECRET_DETAIL({id: secret.get('_id')})}),
        [secret],
    )
    return (
        <View 
            className={styles.itemWrapper}
            style={{
                backgroundColor: color,
            }}
            >
            <View className={styles.itemContent}>
                <View>
                    <View className={styles.name}>
                        {secret.get('name')}
                    </View>
                    <View className={styles.account}>
                        {secret.get('account')}
                    </View>
                </View>
                <Icon bindclick={handleClickMore} name="more" size={"60rpx"} />
            </View>
        </View>
    );
};

/**
 * 增加秘密大按钮
 */
export const AddSecret = () => {
    const {add} = useContainer(SecretsStore);
    const handleClick = useCallback(() => {
        navigateTo({
            url: ROUTES.SECRET_UPSERT()
        });
    }, [])
    return useMemo(() => (
        <View className={styles.addWrapper} onClick={handleClick}>
            <Icon name="add-o"/>
        </View>
    ), []);
};

/**
 * 秘密列表骨架
 * @param {{
 * loading: Boolean;
 * children: React.ReactElement;
 * }} props 
 */
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
    const secretNodes = useMemo(() => secretList.map((item, index) => (
        <Transition
        key={index}
        show
        name="fade-up"
        duration="500"
        custom-style={{transitionDelay: index * 300 + 'ms'}}>
            <View 
            style={{margin: '8Px auto'}}>
                <SecretItem secret={item} color={COLOR_LIST[index % COLOR_LIST.length]} />
            </View>
        </Transition>
    )), [secretList]);
    const noSecret = useMemo(() => (
        <View className={styles.noSecret}>
            没有密码
        </View>
    ), []);
    return (
        <View className={styles.list}>
            {secretList.size ? secretNodes : noSecret}
        </View>
    );
}