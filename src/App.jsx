import { UserAPI } from './swr';

function App() {
  const { user, isLoading, isError } = UserAPI.getUser({ userId: 'test' });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return <div>{user.name}</div>;
}

export default App;
