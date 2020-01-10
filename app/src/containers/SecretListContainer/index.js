import React, {useEffect, useMemo} from 'react';
import Skeleton from '@vant/weapp/dist/skeleton';
import { API } from '../../apis';
import useAsync from '../../hooks/use-async';
import SecretList, { SecretSkeleton, SecretListError } from '../../components/SecretList';
import {useContainer} from 'unstated-next';
import {SecretsStore} from '../../stores/secrets';
import useLogger from '../../hooks/use-logger';
import withErrorBoundary from '../../hocs/with-error-boundary';
import { usePullDownRefresh, stopPullDownRefresh } from 'remax/wechat';
function SecretListContainer() {
    const {result, loading, error, call} = useAsync(API.getMySecrets);
    if (error) {
        throw error;
    }
    /**
     * @type {{
     * secrets: import('immutable').List<import('immutable').Record<import('../..').SecretType>>
     * }}
     */
    const {setAll, secrets} = useContainer(SecretsStore);
    // 按创建时间排序的，最近的放前面
    const secretsSortedByRecent = useMemo(() => secrets.sort((a, b) => b.get('createAt') - a.get('createAt')), [secrets]);
    const log = useLogger('SecretListContainer', {auto: false});

    /** 更新 store */
    useEffect(() => {
        if (result) {
            setAll(result);
        }
    }, [result]);

    /** 下拉更新 */
    usePullDownRefresh(() => {
        log('pull down');
        call().finally(() => {
            stopPullDownRefresh();
        });
    });

    return (
        <SecretSkeleton
            loading={loading || !secrets}>
            {!loading && secrets && <SecretList secretList={secretsSortedByRecent} />}
        </SecretSkeleton>
    );
}

export default withErrorBoundary(SecretListError)(SecretListContainer);