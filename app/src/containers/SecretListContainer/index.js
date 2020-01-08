import React from 'react';
import Skeleton from '@vant/weapp/dist/skeleton';
import { API } from '../../apis';
import useAsync from '../../hooks/use-async';
import SecretList, { SecretSkeleton } from '../../components/SecretList';
export default function() {
    const {result: secretList, loading, error} = useAsync(API.getMySecrets);
    if (error) {
        throw error;
    }

    return (
        <SecretSkeleton
            loading={loading || !secretList}>
            {!loading && secretList && <SecretList secretList={secretList} />}
        </SecretSkeleton>
    );
}