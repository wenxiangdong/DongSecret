import { createContainer, useContainer } from 'unstated-next';
import { useState, useCallback, useMemo } from 'react';
import { fromJS, Record, List, Map } from 'immutable';
/**
 * @typedef {Record<import("../index").SecretType>} SecretItem
 *
 */
const useSecrets = () => {
  const [secretList, setList] = useState(List());

  /** 清空 */
  const clearList = useCallback(() => {
    setList(List());
  }, []);

  /** 增加 */
  const add = useCallback((...secrets) => {
    setList(preList => preList.push(...secrets));
  }, []);

  /** 更新全部 */
  const setAll = useCallback(secrets => {
    setList(List.of(...secrets));
  }, []);

  /** 更新某一项，如果不存在，则加入 */
  const updateItem = useCallback((/** @type {SecretItem} */ item) => {
    setList(preList => {
      const index = preList.findIndex(
        secret => secret.get('_id') === item.get('_id')
      );
      console.log(index, item.toJS());
      return index < 0 ? preList.push(item) : preList.set(index, item);
    });
  }, []);

  /** 删除一些 */
  const remove = useCallback((/** @type {SecretItem[]} */ ...secrets) => {
    const ids = secrets.map(item => item.get('_id'));
    setList(preList => preList.filter(item => !ids.includes(item.get('_id'))));
  }, []);

  return {
    clearList,
    add,
    setAll,
    updateItem,
    remove,
    secrets: secretList
  };
};

export const SecretsStore = createContainer(useSecrets);
