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

const CandleStick = () => {
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
    sendMessage('getSession');
  }, []);

  const series = useMemo(() => {
    return [{ data: transformData(sessions) }];
  }, [sessions]);

  return (
    <div id="chart" className="shadow shadow-lg sm:rounded-lg bg-[#3d4443] w-full">
      <ReactApexChart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
};

export default CandleStick;
