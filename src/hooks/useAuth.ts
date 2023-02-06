import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Alert from '../components/Alert';

interface User {
  uid: string;
  email: string | null;
  password?: string | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  const onAuthStateChanged = (user: User | null) => {
    setUser(user);
  };

  const register = async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        return Alert({message: 'That email address is already in use!'});
      }
      if (error.code === 'auth/invalid-email') {
        return Alert({message: 'That email address is invalid!'});
      }
      if (error.code === 'auth/weak-password') {
        return Alert({message: 'Password must be at least 6 characters!'});
      }

      Alert({message: error.message});
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);

      return user;
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        return Alert({message: 'That email address is invalid!'});
      }
      if (error.code === 'auth/user-not-found') {
        return Alert({message: 'User not found!'});
      }
      if (error.code === 'auth/wrong-password') {
        return Alert({message: 'Wrong password!'});
      }

      Alert({message: error.message});
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      Alert({message: error.message});
    }
  };

  return {
    user,
    register,
    login,
    logout,
  };
};
