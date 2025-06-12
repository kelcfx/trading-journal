import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import {
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
  const signInWithYahoo = () => signInWithPopup(auth, new OAuthProvider('yahoo.com'));
  const signInAsGuest = () => signInAnonymously(auth);
  const logout = () => signOut(auth);

  return { user, loading, signInWithGoogle, signInWithYahoo, signInAsGuest, logout };
}
