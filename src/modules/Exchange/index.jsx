import React, { useEffect, useMemo } from 'react';
import { DataTable } from 'shared/components/DataTable';
import { OrderForm } from 'shared/components/OrderForm';
import useSocket from 'shared/hooks/useSocket';
import dayjs from 'dayjs';
import useInterval from 'shared/hooks/useInterval';
import { useState } from 'react';
import useAuth from 'shared/hooks/useAuth';

const Exchange = () => {
  const [startTime, setStartTime] = useState(dayjs().set('minute', 0).set('second', 0));
  const [endTime, setEndTime] = useState(dayjs().set('minute', 59).set('second', 59));
  const { messages: orderbooks, sendMessage } = useSocket('orderBooks');
  const username = useAuth();

  useEffect(() => {
    sendMessage('getOrderbook', { startTime: startTime.toDate(), endTime: endTime.toDate() });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime.format('HH:mm:ss'), endTime.format('HH:mm:ss')]);

  useInterval(() => {
    const startTradeTime = dayjs().set('minute', 0).set('second', 0);
    const endTradeTime = dayjs().set('minute', 59).set('second', 59);

    setStartTime(startTradeTime);
    setEndTime(endTradeTime);
  }, 1000 * 3);

  const bid = useMemo(() => {
    return orderbooks
      .filter(order => order.side === 'buy')
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
  }, [orderbooks]);

  const ask = useMemo(() => {
    return orderbooks
      .filter(order => order.side === 'sell')
      .sort((a, b) => a.price - b.price)
      .slice(0, 5);
  }, [orderbooks]);

  const handleOrder = (side, order, orderType) => {
    console.log('orderDetail: ', {
      side,
      orderType,
      accountNo: username.clientId,
      ...order,
    });

    sendMessage('sendOrder', {
      side,
      orderType,
      accountNo: username.clientId,
      ...order,
    });
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-end justify-end">
        <span className="bg-gray-100 text-gray-800 text-xs font-semibold my-2 px-2.5 rounded dark:bg-gray-700 dark:text-gray-300">
          <h6 className="my-2 text-lg font-bold tracking-tight text-white">
            Trade time: {startTime.format('HH:mm:ss')} - {endTime.format('HH:mm:ss')}
          </h6>
        </span>
      </div>

      <div className="my-2">
        <DataTable bid={bid} ask={ask} />
      </div>

      <div className="my-4 flex flex-col sm:flex-col md:flex-row lg:flex-row justify-evenly">
        <OrderForm side="Buy" handleOrder={handleOrder} order={bid} />
        <OrderForm side="Sell" handleOrder={handleOrder} order={ask} />
      </div>
    </div>
  );
};

export default Exchange;
