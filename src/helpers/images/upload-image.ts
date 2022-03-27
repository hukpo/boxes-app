import { v4 as uuidv4 } from 'uuid';
import storage from '@react-native-firebase/storage';

type UploadImageResult = {
  key: string;
};

export const uploadImage = async (path: string): Promise<UploadImageResult> => {
  const result = await storage().ref(uuidv4()).putFile(path);

  return {
    key: result.metadata.name,
  };
};
