import { LocalUser } from '@/types/ISignin';
import React, { createContext, useMemo, useState } from 'react';

export interface UserContextValue {
  user: LocalUser | null;
  setUser: React.Dispatch<React.SetStateAction<LocalUser | null>>;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined,
);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<LocalUser | null>(() => {
    const localUser = localStorage.getItem('user');
    return localUser ? JSON.parse(localUser) : null;
  });

  return (
    <UserContext.Provider value={useMemo(() => ({ user, setUser }), [user])}>
      {children}
    </UserContext.Provider>
  );
}
