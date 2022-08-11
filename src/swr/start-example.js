import useSWR from 'swr';

// JSON 데이터를 사용하는 일반적인 RESTful API라면
// 먼저 네이티브 fetch의 단순한 래퍼인 fetcher 함수를 생성해야 합니다.
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// 일반적으로, 세 가지 요청 상태가 가능합니다: "loading", "ready", "error".
// data와 error 값을 사용해 현재 요청의 상태를 알아내고, 해당하는 UI를 반환할 수 있습니다.
function Profile() {
  const { data, error } = useSWR(`${import.meta.env.VITE_GET_USER}/test`, fetcher);

  if (error) return <div>failed to load</div>; // error 상태
  if (!data) return <div>loading...</div>; // loading 상태
  return <div>hello {data.name}!</div>; // ready
}
