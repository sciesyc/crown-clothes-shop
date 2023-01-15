import { createContext, useEffect, useState } from 'react';

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../../utils/firebase/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  console.log('out of userEffect currentUser: ', currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      console.log('in useEffect user: ', user);
      if (user) {
        await createUserDocumentFromAuth(user);
      }

      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
