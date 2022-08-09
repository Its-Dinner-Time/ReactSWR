import swr from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function getUser({ userId }) {
  const { data, error } = swr(`/dev/user${userId ? `/${userId}` : ''}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default { getUser };
