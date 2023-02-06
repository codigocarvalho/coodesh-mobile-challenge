import {StyleSheet} from 'react-native';
import {theme} from '../../global/theme';

const DEFAULT_IMAGE_SIZE = {
  height: 180,
  maxHeight: 180,
  width: 180,
  maxWidth: 180,
};

export const styles = StyleSheet.create({
  container: {
    ...DEFAULT_IMAGE_SIZE,
    backgroundColor: theme.colors.disabled,
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  image: {
    ...DEFAULT_IMAGE_SIZE,
    borderRadius: 8,
  },
});
