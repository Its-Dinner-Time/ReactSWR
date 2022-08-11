import React from 'react';

import { useUser } from '../swr/reusable-example';

const UserState = ({ id }) => {
  const { user, isLoading, isError } = useUser(id ?? 'test');

  if (isLoading) return <div>failed to load</div>; // error 상태
  if (isError) return <div>loading...</div>; // loading 상태
  return <div>hello {user.name}!</div>; // ready
};

export default UserState;
