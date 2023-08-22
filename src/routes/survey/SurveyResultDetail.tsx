import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSurveyResultDetail } from '@/api/survey/surveyRequests';
import SurveyBarChart from '@/components/survey/SurveyBarChart';
import { IChart, IChartArea } from '@/types/IChart';
import { ISurveyResultDetail } from '@/types/ISurvey';
import { ADRESS_SELECT_OPTIONS } from '@/data/constants';

const SurveyResultDetail = () => {
  const params = useParams();
  const surveyId = params.surveyId;
  const [surveyDetail, setSurveyDetail] = useState<ISurveyResultDetail | null>(
    null,
  );
  const answers = useMemo(() => surveyDetail?.answers ?? [], [surveyDetail]);

  const totalScore = useMemo(() => {
    const totalScoreList = [] as IChart[];
    if (surveyDetail) {
      surveyDetail.options.map((option) => {
        totalScoreList.push({
          id: option.id as number,
          title: option.content,
          totalNum: answers.filter((answer) => answer.optionId === option.id)
            .length,
        });
      });
      return totalScoreList;
    }
    return totalScoreList;
  }, [answers, surveyDetail]);

  const areaList = useMemo(() => {
    const areaScoreList = [] as IChartArea[];
    if (surveyDetail) {
      ADRESS_SELECT_OPTIONS.map((address) => address.city).map(
        (city, index) => {
          areaScoreList.push({
            id: index,
            city: city,
            answers: answers.filter((answer) => answer.area === city),
          });
        },
      );
      console.log(areaScoreList);
      return areaScoreList;
    }

    return areaScoreList;
  }, [answers, surveyDetail]);

  const getSurveyDetailData = (id: number) => {
    getSurveyResultDetail(id).then(
      (res) => {
        setSurveyDetail(res.data as ISurveyResultDetail);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  useEffect(() => {
    getSurveyDetailData(Number(surveyId));
  }, [surveyId]);
  return (
    <div className="container mx-auto py-10">
      {surveyDetail && (
        <div className="mx-5 rounded bg-white py-5 sm:mx-20">
          <h2 className="text-center text-lg font-medium sm:text-2xl">
            {surveyDetail.title}
          </h2>
          <p className="my-10 px-5 text-right">
            조사 기간 : {surveyDetail.startDate} ~ {surveyDetail.endDate}
          </p>

          <div className="mx-10">
            <h6 className="text-sm">1. 전체 응답 결과</h6>
            <SurveyBarChart datas={totalScore} title="전체" />

            <h6 className="mt-10 text-sm">2. 지역별 응답 결과</h6>
            <div className="grid grid-cols-2 gap-4">
              {areaList.map((data) => {
                const scoreList = [] as IChart[];
                surveyDetail.options.map((option) => {
                  scoreList.push({
                    id: option.id as number,
                    title: option.content,
                    totalNum: data.answers.filter(
                      (answer) => answer.optionId === option.id,
                    ).length,
                  });
                });
                console.log(scoreList);
                return <SurveyBarChart datas={scoreList} title={data.city} />;
              })}
            </div>

            <h6 className="mt-10 text-sm">3. 연령별 응답 결과</h6>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyResultDetail;
