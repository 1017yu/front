import { UserContext, UserContextValue } from '@/contexts/UserContext';
import { useContext } from 'react';

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('UserProvider 외부에서 사용하면 안되쥬');
  }
  return context;
};
