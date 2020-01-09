import React, { useMemo, useEffect } from 'react';
import Panel from '@vant/weapp/dist/panel';
import Cell from '@vant/weapp/dist/cell';
import Icon from '@vant/weapp/dist/icon';
import styles from './index.module.less';
import { View, setClipboardData, Text } from 'remax/wechat';
import usePassword from '../../hooks/use-password';
import useLogger from '../../hooks/use-logger';
import VanButton from '@vant/weapp/dist/button';
import {SecretsStore} from '../../stores/secrets';
import { useContainer } from 'unstated-next';



const Button = ({children, bindtap, type, loading, loadingText, disabled}) => (
    <VanButton
        size="mini"
        plain 
        hairline 
        custom-class={styles.button}
        type={type}
        bindtap={bindtap}
        disabled={disabled}
        loading={loading}
        loading-text={loadingText}>
        {children}
    </VanButton>);

/**
 * 密码详情
 * @param {{
 *  secret: import("../..").Record<import("../..").SecretType>
 * }} props 
 */
export default function(props) {
    const {secret} = props;

    const log = useLogger('SecretDetail');
    const {decoding, decode, decodedPassword, error} = usePassword(secret.get('password'));
    const {updateItem} = useContainer(SecretsStore);
    const displayPassword = useMemo(() => {
        if (decoding) {
            return '解码中...';
        } else if (decodedPassword) {
            return decodedPassword;
        } else {
            return secret.get('password');
        }
    }, [secret, decodedPassword, decoding]);

    useEffect(() => {
        if (decodedPassword) {
            updateItem(secret.set('decoded', true));
        }
    }, [decodedPassword, updateItem, secret]);

    const header = useMemo(() => (
        <View slot="header" className={styles.header}>
            {secret.get('name')}
        </View>
    ), [secret]);

    const mainInfo = useMemo(() => {
        const decodeButton = secret.get('decoded') 
            ? null 
            : (
                <Button 
                    bindtap={decode}
                    type="primary"
                    >
                    解码
                </Button>
            );
        const handleClickCopy = () => {
            setClipboardData({
                data: displayPassword
            });
        };
        const copyButton = (
            <Button
                bindtap={handleClickCopy}
                type="default">
                复制
            </Button>
        );
        return (
            <>
            <Cell title="账号" value={secret.get('account')} />
            {/* <Cell title="密码" value={displayPassword} /> */}
            <Cell title="密码" center>
                <View className={styles.passwordCellContent}>
                    <Text>{displayPassword}</Text>
                    {decodeButton}
                    {copyButton}
                </View>
            </Cell>
            </>
        );
    }, [secret, displayPassword, decode]);

    const extraInfo = useMemo(() => {
        const phone = secret.get('phone');
        const copyPhoneButton = (
            <Button
                bindtap={() => setClipboardData(phone)}
                type="default">
                复制
            </Button>
        );
        return (
            <>
            {phone && 
                <Cell title="绑定手机">
                    <View>
                        <Text>{phone}</Text>
                        {copyPhoneButton}
                    </View>
                </Cell>}
            </>
        );
    }, [secret]);

    return (
        <Panel>
            {header}
            {mainInfo}
            {extraInfo}
        </Panel>
    );
}