import React, { useMemo } from 'react';
import { IChart } from '@/types/IChart';
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

type TSurveyBarChartProps = {
  title: string;
  datas: IChart[];
};

const SurveyBarChart = React.memo(({ title, datas }: TSurveyBarChartProps) => {
  const maxSize = useMemo(
    () =>
      Math.ceil(Math.max(...datas.map((data) => data.value)) / 20) * 20 + 20,
    [datas],
  );

  return (
    <div className="h-[300px] w-full text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          className="mt-5"
          width={500}
          height={300}
          data={datas}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
          barCategoryGap={'30%'}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickCount={5} domain={[0, maxSize]} allowDecimals={false} />
          <Tooltip formatter={(value) => [`${value}표`, '투표수']} />
          <Bar dataKey="value" fill="#00C9A7" name="투표수" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default SurveyBarChart;
