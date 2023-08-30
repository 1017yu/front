const config = {
  bucketName: import.meta.env.VITE_BUCKET_NAME,
  region: 'ap-northeast-2',
  accessKeyId: import.meta.env.VITE_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
};

export const boardConfig = {
  ...config,
  dirName: 'resource/board/image',
};

export const userConfig = {
  ...config,
  dirName: 'resource/user/image',
};

export const eventConfig = {
  ...config,
  dirName: 'resource/event/image',
};
