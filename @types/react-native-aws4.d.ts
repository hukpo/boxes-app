declare module 'react-native-aws4' {
  export type SignOptions = {
    service: 's3';
    method: 'GET';
    host: string;
    path: string;
    region: string;
  };

  type Credentials = {
    accessKeyId: string;
    sessionToken: string;
    secretAccessKey: string;
  };

  type SignedRequest = {
    headers: Record<string, string>;
  };

  function sign(options: SignOptions, credentials: Credentials): Promise<SignedRequest>;
}
