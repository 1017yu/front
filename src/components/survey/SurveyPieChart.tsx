import React from 'react';
import { IChart } from '@/types/IChart';
import {
  PieChart,
  Legend,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { PIE_COLORS } from '@/data/constants';

type TSurveyPieChartProps = {
  title: string;
  datas: IChart[];
};

const SurveyPieChart = React.memo(({ title, datas }: TSurveyPieChartProps) => {
  return (
    <div className="relative h-[300px] w-full text-xs sm:aspect-square md:h-[400px]">
      <h2 className="absolute left-0 right-0 top-4 z-10 text-center text-sm font-medium">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        {datas.find((data) => data.value !== 0) ? (
          <PieChart>
            <Pie data={datas} dataKey="value" outerRadius={100} fill="#8884d8">
              {datas.map((data, index) => (
                <Cell
                  style={{ outline: 'none' }}
                  name={data.name}
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>

            <Legend
              verticalAlign="bottom"
              iconSize={12}
              align="center"
              fontSize={10}
            />
            <Tooltip />
          </PieChart>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-base text-subTextAndBorder">
              응답 결과가 없습니다.
            </p>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
});

export default SurveyPieChart;
