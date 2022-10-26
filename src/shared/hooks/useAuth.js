import { userMapping } from 'constants/user';
import useQuery from './useQuery';

function useAuth() {
  const query = useQuery();

  const userKey = query.get('Authorization');
  const user = userMapping.find(user => user.key === userKey);

  if (user === undefined) {
    return window.location.replace('/login');
  }
  return user;
}

export default useAuth;
