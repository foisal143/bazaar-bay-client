import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/cordova';
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

  // user detector
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, [auth]);

  // my auth information here
  const authInfo = {
    user,
    googleLogin,
    signInWithEmail,
    createUser,
    updateUser,
    loading,
  };
  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvaider;
