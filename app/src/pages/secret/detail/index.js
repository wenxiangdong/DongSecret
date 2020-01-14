import React, { useEffect, useCallback } from 'react';
import {
  View,
  navigateTo,
  showToast,
  navigateBack,
  showModal
} from 'remax/wechat';
import { fromJS } from 'immutable';
import Button from '@vant/weapp/dist/button';
import styles from './index.module.less';
import SecretDetail from '../../../components/SecretDetail';
import useLogger from '../../../hooks/use-logger';
import { useContainer } from 'unstated-next';
import { SecretsStore } from '../../../stores/secrets';
import { API } from '../../../apis';
import useAsync from '../../../hooks/use-async';
import { ROUTES } from '../../../constants';

/**
 * 编辑按钮
 * @param {{
 * secret: import('immutable').Record<import('../..').SecretType>;
 * onEdit: (secret: import('immutable').Record<import('../..').SecretType>) => void;
 * }} props
 */
const EditSecretButton = props => {
  const { secret, onEdit } = props;
  const handleClickModifyButton = useCallback(() => {
    navigateTo({
      url: ROUTES.SECRET_UPSERT({ id: secret.get('_id') })
    });
    onEdit?.(secret);
  }, [secret]);
  return (
    <Button
      type="primary"
      block
      icon="edit"
      custom-class={styles.functionalButton}
      bindclick={handleClickModifyButton}
    >
      编辑
    </Button>
  );
};

/**
 * 删除按钮
 * @param {{
 *  secret: import('immutable').Record<import('../..').SecretType>;
 *  onDelete: async () => void;
 * }} props
 */
const DeleteSecretButton = props => {
  const { secret, onDelete } = props;
  const { loading, error, result, call } = useAsync(onDelete, {
    autoCall: false,
    debounce: true
  });

  useEffect(() => {
    if (!!error) {
      showToast({
        title: '删除失败',
        icon: 'none'
      });
    } else if (!!result) {
      showToast({
        title: '删除成功',
        icon: 'success'
      });
    }
  }, [result, error]);
  const handleClickDelete = useCallback(async () => {
    try {
      const { confirm } = await showModal({
        content: '确认要删除这个密码项吗？',
        confirmText: '删除',
        confirmColor: 'tomato'
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
      custom-class={styles.functionalButton}
    >
      删除
    </Button>
  );
};

export default props => {
  const log = useLogger('secret/detail/index');

  log(props.location.query);
  const { getItem, remove, updateItem } = useContainer(SecretsStore);
  const secret = getItem(props.location.query.id);
  log(secret);

  const handleDelete = useCallback(async () => {
    await API.deleteSecret(secret.get('_id'));
    remove(secret);
    setTimeout(() => navigateBack(), 1000);
    return true;
  }, [secret]);

  return (
    <View className={styles.wrapper}>
      <SecretDetail secret={secret} onUpdate={updateItem} />
      <View className={styles.functionalButtonGroup}>
        <EditSecretButton secret={secret} />
        <DeleteSecretButton secret={secret} onDelete={handleDelete} />
      </View>
    </View>
  );
};
