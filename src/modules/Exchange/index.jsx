import React, { useState } from 'react';
import { DataTable } from 'shared/components/DataTable';
import { OrderForm } from 'shared/components/OrderForm';

const Exchange = () => {
  const [bid, setBid] = useState([
    {
      price: 20000,
      amount: 10,
    },
    {
      price: 21500,
      amount: 15,
    },
  ]);
  const [ask, setAsk] = useState([
    {
      price: 21000,
      amount: 8,
    },
    {
      price: 20500,
      amount: 12,
    },
    {
      price: 20700,
      amount: 18,
    },
  ]);

  const handleOrder = (side, order) => {
    if (side === 'Buy') {
      const isAlready = bid.find(b => b.price === order.price);
      if (isAlready) {
        const alreadyBid = bid.map(b => {
          if (b.price === order.price) {
            return { ...b, amount: b.amount + order.amount };
          }

          return b;
        });

        return setBid(alreadyBid);
      }

      return setBid([...bid, order]);
    }

    const isAlready = ask.find(a => a.price === order.price);
    if (isAlready) {
      const alreadyAsk = ask.map(a => {
        if (a.price === order.price) {
          return { ...a, amount: a.amount + order.amount };
        }

        return a;
      });

      return setAsk(alreadyAsk);
    }

    return setAsk([...ask, order]);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="my-4">
        <DataTable bid={bid} ask={ask} />
      </div>

      <div className="my-4 flex flex-col sm:flex-col md:flex-row lg:flex-row justify-evenly">
        <OrderForm side="Buy" handleOrder={handleOrder} />
        <OrderForm side="Sell" handleOrder={handleOrder} />
      </div>
    </div>
  );
};

export default Exchange;
