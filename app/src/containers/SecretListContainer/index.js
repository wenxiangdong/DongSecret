import React, { useEffect, useMemo } from 'react';
import Skeleton from '@vant/weapp/lib/skeleton';
import { API } from '../../apis';
import useAsync from '../../hooks/use-async';
import SecretList, {
  SecretSkeleton,
  SecretListError
} from '../../components/SecretList';
import { useContainer } from 'unstated-next';
import { SecretsStore } from '../../stores/secrets';
import useLogger from '../../hooks/use-logger';
import withErrorBoundary from '../../hocs/with-error-boundary';
import { usePageEvent } from 'remax/macro';
import useSecrets from '../../hooks/use-secrets';
/**
 *
 * @param {{keyword: String}} param0
 */
function SecretListContainer({ keyword = '' }) {
  const { secrets, error, loading, reload } = useSecrets(true);
  if (error) {
    throw error;
  }
  // 按创建时间排序的，最近的放前面
  const displaySecrets = useMemo(
    () =>
      secrets
        .filter(item =>
          [item.get('account'), item.get('name')].some(string =>
            string.includes(keyword)
          )
        )
        .sort((a, b) => b.get('createAt') - a.get('createAt')),
    [secrets, keyword]
  );
  const log = useLogger('SecretListContainer', { auto: false });

  /** 下拉更新 */
  usePageEvent('onPullDownRefresh', () => {
    log('pull down');
    return reload();
  });

  return (
    <SecretSkeleton loading={loading || !secrets}>
      {!loading && secrets && <SecretList secretList={displaySecrets} />}
    </SecretSkeleton>
  );
}

export default withErrorBoundary(SecretListError)(SecretListContainer);
