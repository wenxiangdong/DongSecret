import React, { useMemo, useEffect, useCallback } from 'react';
import Panel from '@vant/weapp/dist/panel';
import CellGroup from '@vant/weapp/dist/cell-group';
import Field from '@vant/weapp/dist/field';
import Icon from '@vant/weapp/dist/icon';
import Button from '@vant/weapp/dist/button';
import styles from './index.module.less';
import { View, setClipboardData, Text } from 'remax/wechat';
import usePassword from '../../hooks/use-password';
import useLogger from '../../hooks/use-logger';
import SocialCell from '../SocialItem';

const Cell = ({ title, value, children }) => {
  return (
    <Field label={title} value={value} readonly={true}>
      {children}
    </Field>
  );
};

const OperationButton = ({
  children,
  bindclick,
  type,
  loading,
  loadingText,
  disabled
}) => (
  <Button
    size="small"
    plain
    hairline
    custom-class={styles.button}
    type={type}
    bindclick={bindclick}
    disabled={disabled}
    loading={loading}
    loading-text={loadingText}
  >
    {children}
  </Button>
);

/**
 * 密码详情
 * @param {{
 *  secret: import("../..").SecretRecord;
 *  onUpdate: (secret: import("../..").SecretRecord) => void;
 * }} props
 */
export default function(props) {
  const { secret, onUpdate } = props;
  if (!secret) return null;

  const log = useLogger('SecretDetail');
  const { decoding, decode, decodedPassword, error } = usePassword(
    secret.get('password')
  );

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
      onUpdate?.(secret.set('decoded', true).set('password', decodedPassword));
    }
  }, [decodedPassword, onUpdate, secret]);

  //======== elements =========//
  /** 标题 */
  const header = useMemo(
    () => (
      <View slot="header" className={styles.header}>
        {secret.get('name')}
      </View>
    ),
    [secret]
  );

  /** 主要信息 */
  const mainInfo = useMemo(() => {
    const phone = secret.get('phone');
    const decodeButton = !secret.get('decoded') && (
      <OperationButton bindclick={decode} type="primary">
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
        bindclick={() => setClipboardData({ data: displayPassword })}
        type="default"
      >
        复制
      </OperationButton>
    );
    const copyPhoneButton = (
      <OperationButton
        bindclick={() => setClipboardData({ data: phone })}
        type="default"
      >
        复制
      </OperationButton>
    );
    return (
      <CellGroup title="主要信息">
        <Cell title="账号" value={secret.get('account')} />
        {/* <Cell title="密码" value={displayPassword} /> */}
        <Cell title="密码" value={displayPassword}>
          <View slot="button">
            {decodeButton}
            {copyPasswordButton}
          </View>
        </Cell>
        {phone && (
          <Cell title="绑定手机" value={phone}>
            <View slot="button">{copyPhoneButton}</View>
          </Cell>
        )}
      </CellGroup>
    );
  }, [secret, displayPassword, decode]);

  /** 额外信息 */
  const extraInfo = useMemo(() => {
    const socialList = secret.get('socialList');
    const socialListComponents = socialList.map(item => {
      return <SocialCell key={item.get('id')} socialItem={item} />;
    });
    return (
      <>
        {!!socialList.size && (
          <CellGroup title="绑定社交">{socialListComponents}</CellGroup>
        )}
      </>
    );
  }, [secret]);

  // /** 功能按钮 */
  // const functionalButtons = useMemo(() => {
  //   return (
  //     <View className={styles.functionalButtonGroup}>
  //       <EditSecretButton secret={secret} onEdit={onEdit} />
  //       <DeleteSecretButton secret={secret} onDelete={onDelete} />
  //     </View>
  //   );
  // }, [secret, onDelete, onEdit]);

  return (
    <Panel custom-class={styles.panel}>
      {header}
      {mainInfo}
      {extraInfo}
    </Panel>
  );
}
