import { userMapping } from 'constants/user';
import useQuery from './useQuery';

function useAuth() {
  const username = window.localStorage.getItem('username');
  const query = useQuery();

  const userKey = query.get('Authorization');
  const user = userMapping.find(user => user.key === userKey);

  if (user) {
    window.localStorage.setItem('username', user.clientId);
    return user;
  }

  if (username) {
    return userMapping.find(user => user.clientId === username);
  }

  return window.location.replace('/login');
}

export default useAuth;
