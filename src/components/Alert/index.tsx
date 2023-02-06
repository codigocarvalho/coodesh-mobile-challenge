import {Alert as RNAlert} from 'react-native';

interface AlertProps {
  message: string;
  onConfirm?: () => void;
}

const Alert = ({message, onConfirm}: AlertProps) => {
  const withOptions = onConfirm
    ? [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => onConfirm(),
          style: 'destructive',
        },
      ]
    : undefined;

  return RNAlert.alert('iCood', message, withOptions);
};

export default Alert;
