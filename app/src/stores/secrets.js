import {createContainer} from 'unstated-next';
import {useState, useCallback, useMemo} from 'react';
import {fromJS, Record, List, Map} from 'immutable';
/**
 * @typedef {Record<import("../index").SecretType>} SecretItem
 */

const useSecrets = () => {
    /** 
     * @typedef {Map<string, SecretItem>} SecretMap
     * @type {[SecretMap, React.Dispatch<React.SetStateAction<SecretMap>>]}
     */ 
    const [secretMap, setSecretMap] = useState(Map());

    const secretList = useMemo(() => secretMap.toList(), [secretMap]);


    /** 清空 */
    const clearList = useCallback(() => {
        setList(Map());
    }, []);

    /** 增加 */
    const add = useCallback((...secrets) => {
        setSecretMap(preMap => secrets.reduce(
            (result, cur) => result.set(cur.get('_id'), cur),
            preMap
        ));
    }, []);

    /** 更新全部 */
    const setAll = useCallback((...secrets) => {
        setSecretMap(preMap => secrets.reduce(
            (result, cur) => result.set(cur.get('_id'), cur),
            Map()
        ));
    }, []);

    /** 更新某一项 */
    const updateItem = useCallback((/** @type {SecretItem} */item) => {
        setSecretMap(preMap => preMap.set(item.get('_id'), item));
    }, []);

    /** 删除一些 */
    const remove = useCallback((/** @type {SecretItem[]} */...secrets) => {
        setSecretMap(preMap => preMap.deleteAll(
            secrets.map(item => item.get('_id'))
        ));
    }, []);

    /** 拿某个 */
    /**
     * @type {(id: string) => SecretItem}
     */
    const getItem = useCallback((id) => secretMap.get(id) || Record(), [secretMap]);

    return {
        clearList,
        add,
        setAll,
        updateItem,
        remove,
        getItem,
        secrets: secretList,
    };
};