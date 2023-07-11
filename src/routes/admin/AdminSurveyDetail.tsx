import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import SurveyAnswerTag from '@/components/admin/SurveyAnswerTag';
import Datepicker from 'react-tailwindcss-datepicker';
/**
 * 관리자 수요조사 등록/조회/수정 페이지
 */
interface DateValueType {
  startDate: string | null | Date;
  endDate: string | null | Date;
}
const AdminSurveyDetail = () => {
  const [title, setTitle] = useState<string>('');
  const [surveyDate, setSurveyDate] = useState<DateValueType | null>({
    startDate: null,
    endDate: null,
  });
  const [answer, setAnswer] = useState<string>('');
  const [answerList, setAnswerList] = useState<string[]>([]);

  const handleValueChange = (newDate: DateValueType | null) => {
    setSurveyDate(newDate);
  };

  const handleAnswerAddClick = () => {
    if (answer.trim()) {
      answerList.push(answer.trim());
      setAnswer('');
    }
  };

  const handleDeleteAnswer = (answer: string) => {
    setAnswerList(answerList.filter((a) => a !== answer));
  };

  const handleClickSurveyAdd = () => {
    const request = {
      title: title,
      startDate: surveyDate?.startDate,
      endDate: surveyDate?.endDate,
      options: answerList.map((answer) => {
        return { content: answer };
      }),
    };
    console.log(request);
  };

  const today = new Date();

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 px-5 py-10">
      <h1 className="text-3xl font-medium">수요조사 등록</h1>
      <form className="mt-10">
        <div className="flex flex-col gap-6">
          <Input
            name="title"
            label="수요조사 제목"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="수요조사의 제목을 입력하세요."
            value={title}
          />

          <label className="text-subTextAndBorder" htmlFor="date">
            수요조사 기간
            <Datepicker
              i18n={'ko'}
              inputClassName={
                'mt-1 h-12 w-full rounded-md border-2 border-subTextAndBorder px-3 py-2 outline-none transition focus:border-accent'
              }
              primaryColor={'teal'}
              startFrom={today}
              value={surveyDate}
              onChange={handleValueChange}
            />
          </label>

          <div className="flex w-[60%] gap-5">
            <div className="flex-grow">
              <Input
                name="answer"
                label="수요조사 선택지"
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                placeholder="선택지를 입력 후 추가 버튼을 클릭하세요."
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleAnswerAddClick();
                  }
                }}
                value={answer}
              />
            </div>
            <div className="min-w-[80px] self-end">
              <Button
                onClick={handleAnswerAddClick}
                contents={'추가'}
                secondary
              />
            </div>
          </div>

          <ul className="flex min-h-[40px] gap-3">
            {answerList.map((answer, index) => (
              <SurveyAnswerTag
                answer={answer}
                key={index}
                onDelete={handleDeleteAnswer}
              />
            ))}
          </ul>

          <div className="mt-10 min-w-[120px] self-end">
            <Button onClick={handleClickSurveyAdd} contents={'등록하기'} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSurveyDetail;
