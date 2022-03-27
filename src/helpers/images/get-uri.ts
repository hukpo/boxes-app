import storage from '@react-native-firebase/storage';

export const getImageUri = (key: string): Promise<string> => {
  return storage().ref(key).getDownloadURL();
};
