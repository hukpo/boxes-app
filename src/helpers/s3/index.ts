import aws4, { SignOptions } from 'react-native-aws4';

import { Auth } from '@aws-amplify/auth';
import { Storage } from '@aws-amplify/storage';

import aws_exports from '@/aws-exports';

export type S3Image = {
  uri: string;
  headers: Record<string, string>;
};

export const getS3Image = async (key: string): Promise<S3Image> => {
  try {
    const uri = await Storage.get(key);
    const url = uri.split('?')[0];

    const credentials = Auth.essentialCredentials(await Auth.currentCredentials());

    const { hostname, pathname, search } = new URL(url);

    const opts: SignOptions = {
      service: 's3',
      method: 'GET',
      host: hostname,
      path: `${pathname}${search}`,
      region: aws_exports.aws_user_files_s3_bucket_region,
    };

    const { headers } = await aws4.sign(opts, credentials);

    return {
      headers,
      uri: url,
    };
  } catch {
    return {
      uri: key,
      headers: {},
    };
  }
};
