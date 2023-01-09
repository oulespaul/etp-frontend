import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useSocket from 'shared/hooks/useSocket';

const transformData = sessions => {
  return sessions.map(session => {
    return {
      x: session.tradeTime,
      y: [Number(session.openPrice), Number(session.highPrice), Number(session.lowPrice), Number(session.closePrice)],
    };
  });
};
const activeTimeframeStyle = 'z-10 ring-2 ring-gray-700 bg-gray-500 text-white';

const CandleStick = () => {
  const [timeframe, setTimeframe] = useState('hour');
  const { messages: sessions, sendMessage } = useSocket('sessions');

  const [options] = useState({
    chart: {
      type: 'candlestick',
      height: 450,
      toolbar: { show: false },
    },
    xaxis: {
      labels: { style: { colors: '#ffffff' } },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: { style: { colors: '#ffffff' } },
    },
  });

  useEffect(() => {
    sendMessage('getSession', timeframe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe]);

  const series = useMemo(() => {
    return [{ data: transformData(sessions) }];
  }, [sessions]);

  return (
    <div id="chart" className="shadow shadow-lg sm:rounded-lg bg-[#3d4443] w-full">
      <div className="flex justify-end p-3">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-gray-300 rounded-l-lg hover:bg-gray-500 hover:text-white ${
              timeframe === 'hour' && activeTimeframeStyle
            }`}
            onClick={() => setTimeframe('hour')}>
            H
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border-t border-b border-gray-300 hover:bg-gray-500 hover:text-white ${
              timeframe === 'day' && activeTimeframeStyle
            }`}
            onClick={() => setTimeframe('day')}>
            D
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-gray-300 rounded-r-md hover:bg-gray-500 hover:text-white ${
              timeframe === 'month' && activeTimeframeStyle
            }`}
            onClick={() => setTimeframe('month')}>
            M
          </button>
        </div>
      </div>

      <ReactApexChart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
};

export default CandleStick;
