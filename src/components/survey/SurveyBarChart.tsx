import React, { useMemo } from 'react';
import { IChart } from '@/types/IChart';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Title,
  Tooltip,
);

type TSurveyBarChartProps = {
  title: string;
  datas: IChart[];
};

const SurveyBarChart = React.memo(({ title, datas }: TSurveyBarChartProps) => {
  const chartData = useMemo(() => {
    return {
      labels: datas.map((data) => data.title),
      datasets: [
        {
          label: '투표수',
          data: datas.map((data) => data.totalNum),
          backgroundColor: ['#00C9A7'],
          maxBarThickness: 40,
          offset: 100,
        },
      ],
    };
  }, [datas]);

  const options = useMemo(() => {
    if (!chartData) {
      return null;
    }
    const maxNum =
      Math.ceil(Math.max(...datas.map((data) => data.totalNum)) / 50) * 50 + 50;
    return {
      maintainAspectRatio: false,
      aspectRatio: 3 / 2,
      responsive: true,
      scales: {
        y: {
          max: maxNum,
          ticks: {
            stepSize: maxNum / 5,
            callback: (value: unknown) => `${value as number}표`,
          },
          beginAtZero: true,
          grid: {
            color: '#000',
          },
        },
        x: {
          grid: {
            color: '#000',
          },
        },
      },
      layout: {
        padding: {
          left: 0,
          top: 20,
          right: 0,
          bottom: 20,
        },
      },
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: `${title}`,
        },
        tooltip: {
          enabled: true,
        },
      },
    };
  }, [chartData, datas, title]);

  return (
    <div>
      {options && (
        <Bar
          className="w-full"
          updateMode="resize"
          options={options}
          data={chartData}
        />
      )}
    </div>
  );
});

export default SurveyBarChart;
