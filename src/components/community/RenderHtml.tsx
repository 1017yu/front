import React from 'react';

type TProps = {
  nickname: string;
  title: string;
  content: string;
  created_at: number;
  updated_at: number;
};
const RenderHtml: React.FC<TProps> = ({
  nickname,
  title,
  content,
  created_at,
  updated_at,
}) => {
  return (
    <div>
      <div>{title}</div>
      <div>{nickname}</div>
      <div>{new Date(created_at).toLocaleString()}</div>
      <div>{new Date(updated_at).toLocaleString()}</div>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};
export default RenderHtml;
