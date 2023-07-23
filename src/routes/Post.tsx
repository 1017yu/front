import { useState, useEffect } from 'react';
import IDummyData_PostDetail from '@/types/IDummyData_PostDetail';
import IDummyData_Comments from '@/types/IDummyData_PostComments';
import RenderHtml from '@/components/community/RenderHtml';

const Post = () => {
  //API 통신으로 데이터를 받아옴
  const [content, setContent] = useState<IDummyData_PostDetail>() || null;

  const times: number = 1689949627586;
  const htmlString: string = `<p>Here is Post Detail Pages</p><p>And This is Test Content Data,</p><p><img src="data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAA0nPX/I5Lx/yeY+P8onPz/Hmmp/xIwSv8LFBv/CAgI/wgJCf8MFh7/EzVS/yBxtv8onv//J5f1/x+R8f9Jpvb/LZfx/x2V+v8fiOH/CipF/wAAAP8AAAH/AAAA/wAAAf8AAAD/AAAA/wAAAP8AAAD/DTVX/yGP7f8Zkff/Q6Lz/y+c+f8diOL/BxYj/wAAAP8AAgP/AQMF/wABAv8AAAD/AAAA/wACA/8BAwT/AAID/wAAAP8LIzf/Go7v/0Wl9/8woP7/CjBQ/wAAAP8BAwX/AAEB/wAAAP8BAwT/Bxoq/wcYJv8BAQL/AAAB/wABAf8BBAb/AAAA/wo+av9Hrv//KXe5/wAAAf8BAQH/AAEC/wAAAP8HFyX/HHfE/yGV9/8hlPb/Gm20/wQOF/8AAAD/AAEC/wEAAP8ABQz/QpDS/x1AXf8AAAD/AQID/wAAAP8CBAb/HX3N/yKd//8fkPH/H5Dx/yOg//8abrX/AAAA/wAAAf8CAwP/AAAA/zddff8VICr/AAAA/wEDBf8AAAD/DTNT/yKc//8fju3/IJLz/yCS8v8fj+//Ipn9/wkjOP8AAAD/AgQF/wAAAP8wPEf/EhMU/wAAAP8BAwX/AAAA/xVWjf8inP//IJDv/yCS8/8gkvP/H5Dv/yKc//8RRHD/AAAA/wIEBv8AAAD/LC0v/xIUFf8AAAD/AQMF/wAAAP8VVYv/Ipz//yCQ7/8gkvP/IJLz/x+Q7/8inP//EUNu/wAAAP8CBAb/AAAA/ywuL/8WIiz/AAAA/wEDBf8AAAD/DTJQ/yKc//8fju3/IJLz/yCS8v8fj+//Ipj8/wkiNv8AAAD/AgQF/wAAAP8wPkn/HUJi/wAAAP8BAgP/AAAA/wIDBf8de8r/Ip7//yCR8f8gkfH/I6D//xpssv8AAAD/AAEB/wIDA/8AAAD/N1+B/yl6vv8AAQP/AAEB/wABAv8AAAD/BhQh/xt0v/8hk/T/IZPz/xlqrv8EDBP/AAAA/wABAv8BAAD/AAYP/0KT1/8wof//CzVY/wAAAP8BAwb/AAEB/wAAAP8BAgP/Bhcl/wYVIv8BAQH/AAAB/wABAf8BBAb/AAAA/wtDcv9Hrv//L5v4/x6L5/8IGir/AAAA/wECA/8BAwX/AQIC/wAAAP8AAAD/AQID/wEDBP8AAgP/AAAA/wwoP/8bkPP/RaT2/yyX8f8ck/n/H4vn/wsvTv8AAAD/AAAB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAB/w06Yf8gkvH/GJD2/0Oi8/83nfX/JpTx/yqZ9/8rnv3/I3K1/xY3U/8PGCD/CwwN/wwNDv8QGiT/GD1c/yV5wv8roP//Kpj1/yOS8f9MqPb/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="></p><p><strong>this is Bolder</strong></p><p><em>this is Italic</em></p><p><u>this is UnderLine</u></p><p><s>this is Strike</s></p><h1>This is Header</h1><ol><li>list 1</li><li>list 2</li><li>list 3</li></ol><p><br></p>`;
  const commentsList: IDummyData_Comments[] = [
    {
      nickname: 'guest1',
      content: 'This is Comment1',
      created_at: times + 100000,
      updated_at: times + 100000,
    },
    {
      nickname: 'guest2',
      content: 'This is Comment2',
      created_at: times + 150000,
      updated_at: times + 150000,
    },
  ];

  const DummyData: IDummyData_PostDetail = {
    nickname: 'PostOwner',
    title: 'This is Title',
    content: htmlString,
    created_at: times,
    updated_at: times + 5000,
    comments: commentsList,
  };

  return (
    <div
      className={
        'container mx-auto mb-[35px] mt-[35px] bg-white pb-[35px] pl-[35px] pr-[35px]'
      }
    >
      <div></div>
      <RenderHtml
        nickname={DummyData.nickname}
        title={DummyData.title}
        content={htmlString}
        created_at={DummyData.created_at}
        updated_at={DummyData.updated_at}
      />
    </div>
  );
};

export default Post;
