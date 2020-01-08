import React, { useMemo } from 'react';
import Panel from '@vant/weapp/dist/panel';
import Cell from '@vant/weapp/dist/cell';
import Icon from '@vant/weapp/dist/icon';
import styles from './index.module.less';
import usePassword from '../../../hooks/use-password';
import { View } from 'remax/wechat';



/**
 * 密码项
 * @param {{
 *  secret: import("../../..").Record<import("../../..").SecretType>
 * }} props 
 */
export default function(props) {
    const {secret} = props;
    const {decoding, decode, decodedPassword, error} = usePassword(secret.get('password'));
    const displayPassword = useMemo(() => {
        if (decodedPassword) {
            return decodedPassword;
        } else {
            return secret.get('password');
        }
    }, [secret, decodedPassword]);


    return (
        <Panel title={secret.get('name')}>
            <Cell title="密码" value={displayPassword}>
                <View slot="right-icon" className={styles.icon} onClick={decode}>
                    解码
                </View>
            </Cell>
        </Panel>
    );
}