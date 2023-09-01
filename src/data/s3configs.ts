import { S3Client } from '@aws-sdk/client-s3';

export const s3config = {
  region: 'ap-northeast-2',
  accessKeyId: import.meta.env.VITE_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
};

export const boardDirName = 'resource/board/image/';
export const eventDirName = 'resource/board/image/';
export const userDirName = 'resource/board/image/';

export const client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
  },
});
