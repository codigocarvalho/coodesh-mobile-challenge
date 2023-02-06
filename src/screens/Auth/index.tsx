import React, {Fragment} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Image, Keyboard} from 'react-native';
import {Button, HelperText} from 'react-native-paper';
import logo from '../../assets/logo.png';
import Alert from '../../components/Alert';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Input from '../../components/Input';
import {useAuth} from '../../hooks/useAuth';
import {styles} from './styles';

type FormData = {
  email: string;
  password: string;
};

const Auth = () => {
  const {login, register} = useAuth();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const onKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const handleSignIn = async ({email, password}) => {
    try {
      onKeyboardDismiss();
      login(email, password);
    } catch (error) {
      Alert({message: error.message});
    }
  };

  const handleSignUp = async ({email, password}) => {
    try {
      onKeyboardDismiss();
      register(email, password);
    } catch (error) {
      Alert({message: error.message});
    }
  };

  const renderEmailInput = ({field: {onChange, value}}) => (
    <>
      <Input
        label="E-mail"
        onChangeText={onChange}
        value={value}
        onSubmitEditing={handleSubmit(handleSignIn)}
      />
      {errors.email && (
        <HelperText type="error">You must provide a valid e-mail</HelperText>
      )}
    </>
  );

  const renderPasswordInput = ({field: {onChange, value}}) => (
    <>
      <Input
        label="Password"
        onChangeText={onChange}
        value={value}
        returnKeyType="done"
        keyboardType="numeric"
        secureTextEntry={true}
        onSubmitEditing={handleSubmit(handleSignUp)}
      />
      {errors.password && (
        <HelperText type="error">You must provide the password</HelperText>
      )}
    </>
  );

  return (
    <Fragment>
      <Header />
      <Container>
        <Image source={logo} style={styles.logo} />
        <Controller
          control={control}
          rules={{required: true}}
          render={renderEmailInput}
          name="email"
        />

        <Controller
          control={control}
          rules={{required: true}}
          render={renderPasswordInput}
          name="password"
        />

        <Button
          style={styles.button}
          icon="log-in-outline"
          mode="contained"
          onPress={handleSubmit(handleSignIn)}>
          Sign in
        </Button>

        <Button
          style={styles.button}
          icon="person-add-outline"
          mode="text"
          onPress={handleSubmit(handleSignUp)}>
          Sign up
        </Button>
      </Container>
    </Fragment>
  );
};

export default Auth;
