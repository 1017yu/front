import React, { useMemo } from 'react';
import { IChartArea } from '@/types/IChart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CHART_COLORS } from '@/data/constants';

type TSurveyBarChartProps = {
  datas: IChartArea[];
  options: string[];
};

const SurveyGroupChart = React.memo(
  ({ datas, options }: TSurveyBarChartProps) => {
    return (
      <div className="h-[350px] w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            className="mt-5"
            data={datas}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 40,
            }}
            barCategoryGap={'10%'}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} fontSize={10} textAnchor="end" />
            <YAxis
              tickCount={5}
              domain={[
                0,
                (dataMax: number) => Math.ceil(dataMax / 10) * 10 + 10,
              ]}
              allowDecimals={false}
            />
            <Tooltip formatter={(value, name) => [`${value}표`, name]} />
            <Legend verticalAlign="top" iconSize={12} fontSize={10} />
            {options.map((option, index) => {
              return (
                <Bar
                  dataKey={option}
                  stackId={'name'}
                  fill={CHART_COLORS[index] ?? 'red'}
                  name={option}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

export default SurveyGroupChart;
