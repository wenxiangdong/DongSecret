import React, { useMemo, useEffect, useCallback } from 'react';
import Panel from '@vant/weapp/dist/panel';
import Cell from '@vant/weapp/dist/cell';
import CellGroup from '@vant/weapp/dist/cell-group';
import Icon from '@vant/weapp/dist/icon';
import Button from '@vant/weapp/dist/button';
import styles from './index.module.less';
import { View, setClipboardData, Text, showToast, showActionSheet, showModal, navigateBack, navigateTo } from 'remax/wechat';
import usePassword from '../../hooks/use-password';
import useLogger from '../../hooks/use-logger';
import VanButton from '@vant/weapp/dist/button';
import {SecretsStore} from '../../stores/secrets';
import { useContainer } from 'unstated-next';
import { SOCIAL_LOGOS, ROUTES } from '../../constants';
import { API } from '../../apis';
import useAsync from '../../hooks/use-async';



const OperationButton = ({children, bindtap, type, loading, loadingText, disabled}) => (
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
 * 社交项
 * @param {{socialItem:  import('immutable').Record<import('../..').SocialType>}} props 
 */
const SocialCell = (props) => {
    const {socialItem} = props;
    const icon = SOCIAL_LOGOS[socialItem.get('id')];
    return (
        <Cell 
        icon={icon}
        title={socialItem.get('name')}
        value={socialItem.get('account')}></Cell>
    );
}

/**
 * 编辑按钮
 * @param {{secret: import('immutable').Record<import('../..').SecretType>}} props 
 */
const EditSecretButton = (props) => {
    const {secret} = props;
    const handleClickModifyButton = useCallback(() => {
        navigateTo({
            url: ROUTES.SECRET_UPSERT({id: secret.get('_id')},)
        });
    }, [secret]);
    return (
        <Button
        type="primary"
        block
        icon="edit"
        custom-class={styles.functionalButton}
        bindclick={handleClickModifyButton}>
            编辑
        </Button>
    );
};

/**
 * 删除按钮
 * @param {{secret: import('immutable').Record<import('../..').SecretType>}} props 
 */
const DeleteSecretButton = (props) => {
    const {secret} = props;
    const {remove} = useContainer(SecretsStore);
    const deleteSecretAsync = useCallback(async () => API.deleteSecret(secret.get('_id')), [secret]);
    const {loading, error, result, call} = useAsync(deleteSecretAsync, {autoCall: false, debounce: true});

    useEffect(() => {
        if (!!error) {
            showToast({
                title: '删除失败',
                icon: 'none',
            });
        } else if (!!result) {
            showToast({
                title: '删除成功',
                icon: 'success'
            });
            remove(secret);
            navigateBack();
        }
    }, [result, error]);
    const handleClickDelete = useCallback(async () => {
        try {
            const {confirm} = await showModal({
                content: '确认要删除这个密码项吗？',
                confirmText: '删除',
                confirmColor: 'tomato',
            });
            confirm && call();
        } catch (error) {}
    }, [call]);
    return (
        <Button
        loading={loading}
        type="danger"
        block
        icon="delete"
        bindclick={handleClickDelete}
        custom-class={styles.functionalButton}>
            删除
        </Button>
    );
}

/**
 * 密码详情
 * @param {{
 *  secret: import("../..").Record<import("../..").SecretType>
 * }} props 
 */
export default function(props) {
    const {secret} = props;
    if (!secret) return null;

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

    /** 更新秘密项的decoded属性 */
    useEffect(() => {
        if (decodedPassword) {
            updateItem(secret.set('decoded', true).set('password', decodedPassword));
        }
    }, [decodedPassword, updateItem, secret]);

    //======== elements =========//
    /** 标题 */
    const header = useMemo(() => (
        <View slot="header" className={styles.header}>
            {secret.get('name')}
        </View>
    ), [secret]);

    /** 主要信息 */
    const mainInfo = useMemo(() => {
        const phone = secret.get('phone');
        const decodeButton = !secret.get('decoded') && (
                <OperationButton 
                    bindtap={decode}
                    type="primary"
                    >
                    解码
                </OperationButton>
            );
        const handleClickCopy = () => {
            setClipboardData({
                data: displayPassword
            });
        };
        const copyPasswordButton = !!secret.get('decoded') && (
            <OperationButton
                bindtap={() => setClipboardData({data: displayPassword})}
                type="default">
                复制
            </OperationButton>
        );
        const copyPhoneButton = (
            <OperationButton
                bindtap={() => setClipboardData({data: phone})}
                type="default">
                复制
            </OperationButton>
        );
        return (
            <CellGroup title="主要信息">
            <Cell title="账号" value={secret.get('account')} />
            {/* <Cell title="密码" value={displayPassword} /> */}
            <Cell title="密码">
                <View className={styles.passwordCellContent}>
                    <Text>{displayPassword}</Text>
                    {decodeButton}
                    {copyPasswordButton}
                </View>
            </Cell>
            {phone && 
            <Cell title="绑定手机">
                <View>
                    <Text>{phone}</Text>
                    {copyPhoneButton}
                </View>
            </Cell>}
            </CellGroup>
        );
    }, [secret, displayPassword, decode]);

    /** 额外信息 */
    const extraInfo = useMemo(() => {
        const socialList = secret.get('socialList');
        const socialListComponents = socialList.map((item) => {
            return <SocialCell key={item.get('id')} socialItem={item} />;
        });
        return (
            <>
            {socialList.size && 
            <CellGroup title="绑定社交">
                {socialListComponents}
            </CellGroup>}
            </>
        );
    }, [secret]);

    /** 功能按钮 */
    const functionalButtons = useMemo(() => {
        return (
            <View className={styles.functionalButtonGroup}>
                <EditSecretButton secret={secret} />
                <DeleteSecretButton secret={secret} />
            </View>
        );
    }, [secret]);

    return (
        <Panel custom-class={styles.panel}>
            {header}
            {mainInfo}
            {extraInfo}
            {functionalButtons}
        </Panel>
    );
}