import useSWR from 'swr';
import fetcher from './fetcher'; // fetch 함수 import

// 해당 함수를 원하는 component에 import하여 사용 (ex. UserState.jsx)
export function useUser(id) {
  const { data, error } = useSWR(`${import.meta.env.VITE_GET_USER}/${id}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data, // loading 상태
    isError: error, // error 상태
  };
}

// 가장 아름다운 것은 이들이 동일한 SWR 키를 사용하며 그 요청이 자동으로 중복 제거, 캐시, 공유되므로, 단 한 번의 요청만 API로 전송된다는 것입니다.
// 또한, 애플리케이션은 이제 사용자 포커스나 네트워크 재연결 시에 데이터를 갱신할 수 있습니다!
// 이는 사용자의 노트북이 슬립으로부터 깨어나거나 브라우저 탭을 전환할 때
// 자동으로 데이터가 갱신된다는 것을 의미합니다.
