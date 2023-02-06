import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import AuthScreen from './src/screens/Auth';
import {useAuth} from './src/hooks/useAuth';

const Auth = createNativeStackNavigator();
const Home = createNativeStackNavigator();

const AuthStack = () => (
  <Auth.Navigator screenOptions={{headerShown: false}}>
    <Auth.Screen name="SignIn" component={AuthScreen} />
  </Auth.Navigator>
);

const HomeStack = () => (
  <Home.Navigator screenOptions={{headerShown: false}}>
    <Home.Screen name="Home" component={HomeScreen} />
  </Home.Navigator>
);

const PrivateStack = () => {
  const {user} = useAuth();

  return user?.uid ? <HomeStack /> : <AuthStack />;
};

const App = () => {
  return (
    <NavigationContainer>
      <PrivateStack />
    </NavigationContainer>
  );
};

export default App;
