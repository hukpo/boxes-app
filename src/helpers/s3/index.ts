import storage from '@react-native-firebase/storage';

export type S3Image = {
  uri: string;
  headers: Record<string, string>;
};

export const getS3Image = async (key: string): Promise<S3Image> => {
  try {
    const ref = storage().ref(key);

    return {
      uri: await ref.getDownloadURL(),
      headers: {},
    };
  } catch (err) {
    console.error(err);
    return {
      uri: key,
      headers: {},
    };
  }
};
