import React, {useEffect} from 'react';
import Skeleton from '@vant/weapp/dist/skeleton';
import { API } from '../../apis';
import useAsync from '../../hooks/use-async';
import SecretList, { SecretSkeleton } from '../../components/SecretList';
import {useContainer} from 'unstated-next';
import {SecretsStore} from '../../stores/secrets';
import useLogger from '../../hooks/use-logger';
export default function() {
    const {result: secretList, loading, error} = useAsync(API.getMySecrets);
    const {setAll} = useContainer(SecretsStore);
    const log = useLogger('SecretListContainer', {auto: false});
    if (error) {
        throw error;
    }

    /** 更新 store */
    useEffect(() => {
        if (secretList) {
            log(secretList.toJS());
            setAll(secretList);
        }
    }, [secretList]);

    return (
        <SecretSkeleton
            loading={loading || !secretList}>
            {!loading && secretList && <SecretList secretList={secretList} />}
        </SecretSkeleton>
    );
}