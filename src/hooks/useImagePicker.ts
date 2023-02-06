import {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Alert from '../components/Alert';
import {displayName as appName} from '../../app.json';

const CAMERA_OPTIONS: CameraOptions = {
  cameraType: 'back',
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 180,
  maxWidth: 180,
};

const GALLERY_OPTIONS: ImageLibraryOptions = {
  mediaType: 'photo',
  maxHeight: 180,
  maxWidth: 180,
};

const useImagePicker = () => {
  const [imageUri, setImageUri] = useState(null);

  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message:
            `${appName} needs access to your camera ` +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(CAMERA_OPTIONS, img => {
          if (img?.didCancel) {
            return;
          }

          setImageUri(img?.assets[0]?.uri);
        });
      } else {
        launchImageLibrary(GALLERY_OPTIONS, img => {
          if (img.didCancel) {
            return;
          }

          setImageUri(img?.assets[0]?.uri);
        });
      }
    } catch (error) {
      Alert({message: error.message});
    }
  };

  const openGallery = async () => {
    launchImageLibrary(GALLERY_OPTIONS, img => {
      if (img.didCancel) {
        return;
      }

      setImageUri(img?.assets[0]?.uri);
    });
  };

  return [imageUri, openCamera, openGallery];
};

export default useImagePicker;
