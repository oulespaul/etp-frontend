import React, { useEffect, useMemo } from 'react';
import { DataTable } from 'shared/components/DataTable';
import { OrderForm } from 'shared/components/OrderForm';
import useSocket from 'shared/hooks/useSocket';

const Exchange = () => {
  const { messages: orderbooks, sendMessage } = useSocket('orderBooks');
  const username = window.localStorage.getItem('username');

  useEffect(() => {
    sendMessage('getOrderbook', {});
  }, []);

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
      accountNo: username,
      ...order,
    });

    sendMessage('sendOrder', {
      side,
      orderType,
      accountNo: username,
      ...order,
    });
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="my-4">
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
