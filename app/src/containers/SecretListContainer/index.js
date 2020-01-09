import React, {useEffect, useMemo} from 'react';
import Skeleton from '@vant/weapp/dist/skeleton';
import { API } from '../../apis';
import useAsync from '../../hooks/use-async';
import SecretList, { SecretSkeleton } from '../../components/SecretList';
import {useContainer} from 'unstated-next';
import {SecretsStore} from '../../stores/secrets';
import useLogger from '../../hooks/use-logger';
export default function() {
    const {result, loading, error} = useAsync(API.getMySecrets);
    /**
     * @type {{
     * secrets: import('immutable').List<import('immutable').Record<import('../..').SecretType>>
     * }}
     */
    const {setAll, secrets} = useContainer(SecretsStore);
    // 按创建时间排序的，最近的放前面
    const secretsSortedByRecent = useMemo(() => secrets.sort((a, b) => b.get('createAt') - a.get('createAt')), [secrets]);
    const log = useLogger('SecretListContainer', {auto: false});
    if (error) {
        throw error;
    }

    /** 更新 store */
    useEffect(() => {
        if (result) {
            setAll(result);
        }
    }, [result]);

    return (
        <SecretSkeleton
            loading={loading || !secrets}>
            {!loading && secrets && <SecretList secretList={secretsSortedByRecent} />}
        </SecretSkeleton>
    );
}