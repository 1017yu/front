import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SurveyResultDetail = () => {
  const params = useParams();
  const surveyId = params.surveyId;
  useEffect(() => {
    console.log(surveyId);
  }, [surveyId]);
  return <div>SurveyResultDetail</div>;
};

export default SurveyResultDetail;
