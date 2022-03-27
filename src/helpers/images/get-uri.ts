import storage from '@react-native-firebase/storage';

const MEMORY_CACHE = new Map<string, string>();

export const getImageUri = async (key: string): Promise<string> => {
  const cachedUri = MEMORY_CACHE.get(key);

  if (cachedUri) {
    return cachedUri;
  }

  const uri = await storage().ref(key).getDownloadURL();

  MEMORY_CACHE.set(key, uri);

  return uri;
};
