import React, { useMemo } from 'react';
import Panel from '@vant/weapp/dist/panel';
import Cell from '@vant/weapp/dist/cell';
import Icon from '@vant/weapp/dist/icon';
import styles from './index.module.less';
import { View, setClipboardData } from 'remax/wechat';
import usePassword from '../../hooks/use-password';
import useLogger from '../../hooks/use-logger';
import VanButton from '@vant/weapp/dist/button';



const Button = ({children, bindtap, type, loading, loadingText, disabled}) => (
    <VanButton
        size="small"
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

    useLogger('SecretDetail');
    const {decoding, decode, decodedPassword, error} = usePassword(secret.get('password'));
    const displayPassword = useMemo(() => {
        if (decoding) {
            return '解码中...';
        } else if (decodedPassword) {
            return decodedPassword;
        } else {
            return secret.get('password');
        }
    }, [secret, decodedPassword, decoding]);

    /======  buttons  =======/
    const decodeButton = useMemo(() => {
        return secret.get('decoded') 
            ? null 
            : (
                <Button 
                    bindtap={decode}
                    type="primary"
                    >
                    解码
                </Button>
            );
    }, [decode, decoding, secret.get('decoded')]);
    const copyButton = useMemo(() => {
        const handleClickCopy = () => {
            setClipboardData({
                data: displayPassword
            });
        };
        return (
            <Button
                bindtap={handleClickCopy}
                type="default">
                复制
            </Button>
        );
    }, [displayPassword]);

    return (
        <Panel title={secret.get('name')}>
            <Cell title="密码" value={displayPassword}>
            </Cell>
            <View className={styles.rightButtonGroup}>
                {decodeButton}
                {copyButton}
            </View>
        </Panel>
    );
}