import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSurveyResultDetail } from '@/api/survey/surveyRequests';
import SurveyBarChart from '@/components/survey/SurveyBarChart';
import { IChart, IChartAge, IChartArea } from '@/types/IChart';
import { ISurveyAnswer, ISurveyResultDetail } from '@/types/ISurvey';
import { ADRESS_SELECT_OPTIONS, AGE_OPTIONS } from '@/data/constants';
import SurveyPieChart from '@/components/survey/SurveyPieChart';
import SurveyGroupChart from '@/components/survey/SurveyGroupChart';

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
          name: option.content,
          value: answers.filter((answer) => answer.optionId === option.id)
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
      ADRESS_SELECT_OPTIONS.map((address) => address.city).map((city) => {
        const areaData = { name: city } as IChartArea;
        const filterAnswers = answers.filter((answer) => answer.area === city);
        surveyDetail.options.map((option) => {
          areaData[option.content] = filterAnswers.filter(
            (answer) => answer.optionId === option.id,
          ).length;
        });
        areaScoreList.push(areaData);
      });
      return areaScoreList;
    }

    return areaScoreList;
  }, [answers, surveyDetail]);

  const ageList = useMemo(() => {
    const ageScoreList = [] as IChartAge[];
    if (surveyDetail) {
      AGE_OPTIONS.map((age) => {
        ageScoreList.push({
          id: age.id,
          age: age.content,
          answers: answers.filter((answer) => answer.age === age.id),
        });
      });
      return ageScoreList;
    }
    return ageScoreList;
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
        <div className="mx-5 rounded bg-white py-5 sm:mx-10 md:mx-20 ">
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
            <div className="grid grid-cols-1 gap-4">
              <SurveyGroupChart
                title="지역"
                datas={areaList}
                options={surveyDetail.options.map((option) => option.content)}
              />
            </div>

            <h6 className="mt-10 text-sm">3. 연령별 응답 결과</h6>
            <div className="grid grid-cols-2 gap-4">
              {ageList.map((data) => {
                const scoreList = [] as IChart[];
                surveyDetail.options.map((option) => {
                  scoreList.push({
                    name: option.content,
                    value: data.answers.filter(
                      (answer: ISurveyAnswer) => answer.optionId === option.id,
                    ).length,
                  });
                });
                return (
                  <SurveyPieChart
                    key={data.id}
                    datas={scoreList}
                    title={data.age}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyResultDetail;
