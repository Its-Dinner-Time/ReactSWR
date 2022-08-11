// fetcher 안에서 에러가 발생했다면 hook에 의해 error로 반환됩니다.

import useSWR from 'swr';

// fetcher가 더 많은 정보를 반환하도록 커스터마이징 할 수 있습니다.
// 상태 코드가 2xx이 아니라면 JSON으로 파싱할 수 있더라도 이를 에러로 간주합니다.
const fetcher = async (...args) => {
  const res = await fetch(...args);

  // 상태 코드가 200-299 범위가 아니더라도,
  // 파싱 시도를 하고 에러를 던집니다.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // 에러 객체에 부가 정보를 추가합니다.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

// SWR은 지수 백오프 알고리즘를 사용해 에러 시 요청을 재시도합니다.
// 이 알고리즘을 사용하면 에러로부터 앱을 빠르게 복구할 수 있으며
// 너무 자주 재시도하여 리소스를 낭비하지도 않습니다.

useSWR(import.meta.env.VITE_GET_USER, fetcher, {
  // 에러 시 재요청 옵션 설정
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // 404에서 재시도 안함
    if (error.status === 404) return;
    // 특정 키에 대해 재시도 안함
    if (key === import.meta.env.VITE_GET_USER) return;
    // 10번까지만 재시도함
    if (retryCount >= 10) return;

    // 5초 후에 재시도
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
});
