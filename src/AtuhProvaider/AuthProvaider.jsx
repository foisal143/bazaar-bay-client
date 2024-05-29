import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase';

export const AuthContext = createContext(null);

const AuthProvaider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvaider = new GoogleAuthProvider();

  // login by google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvaider);
  };

  const signInWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (currentUser, name, image) => {
    return updateProfile(currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const logOut = () => {
    return signOut(auth);
  };

  // user detector
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setLoading(false);
      setUser(currentUser);
      // fech the jwt verify token
      fetch('http://localhost:3000/jwt', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser?.email }),
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('bazzar-bay-ac-token', data.token);
        });
    });

    return () => unsub();
  }, [auth, user]);

  // my auth information here
  const authInfo = {
    user,
    googleLogin,
    signInWithEmail,
    createUser,
    updateUser,
    loading,
    logOut,
  };
  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvaider;
