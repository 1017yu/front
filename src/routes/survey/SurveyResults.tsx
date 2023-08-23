import { useCallback, useEffect, useState } from 'react';
import { fetchSurveyResults } from '@/api/survey/surveyRequests';
import SurveyResultItem from '@/components/survey/SurveyResultItem';
import { ISurveyResultResponse } from '@/types/ISurvey';
import { modalData } from '@/data/modalData';
import { useModal } from '@/hooks/useModal';

const SurveyResults = () => {
  const [results, setResults] = useState<ISurveyResultResponse[]>([]);
  const { openModal } = useModal();

  const getSurveyResults = useCallback(() => {
    fetchSurveyResults().then(
      (res) => {
        setResults(res.data as ISurveyResultResponse[]);
      },
      (error) => {
        openModal({
          ...modalData.SURVEY_RESULT_FETCH_FAILURE,
          content: `${modalData.SURVEY_RESULT_FETCH_FAILURE.content}\n${error.message}`,
        });
      },
    );
  }, [openModal]);

  useEffect(() => {
    getSurveyResults();
  }, [getSurveyResults]);

  return (
    <div className="container px-5 sm:mx-auto sm:px-20">
      <div className="relative my-10 overflow-x-auto">
        <table className="w-full table-fixed overflow-hidden rounded text-left">
          <thead className="bg-accent text-white">
            <tr>
              <th scope="col" className="w-2/3 px-6 py-3">
                수요조사 제목
              </th>
              <th scope="col" className="w-1/3 px-6 py-3">
                기간
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((survey, index) => (
              <SurveyResultItem
                survey={survey}
                key={survey.id}
                isLast={index === results.length - 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyResults;
