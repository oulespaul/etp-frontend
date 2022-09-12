import React, { useEffect } from 'react';
import { useState } from 'react';
import { OrderTable } from 'shared/components/OrderTable';
import axiosInstance from 'main/axios';
import { toast } from 'react-toastify';

const OpenOrder = () => {
  const [openOrders, setOpenOrders] = useState([]);
  const username = window.localStorage.getItem('username');

  const fetchOperOrder = async () => {
    const orders = await axiosInstance.get(`/api/order/${username}`);

    setOpenOrders(orders.data);
  };

  useEffect(() => {
    fetchOperOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnCancel = async order => {
    try {
      const updateOrder = await axiosInstance.patch(`/api/order/${order.order_id}`);

      if (updateOrder.data) {
        toast.success('Cancel order success', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });

        fetchOperOrder();
      }
    } catch (error) {
      toast.error('Cancel order failed', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-end justify-start">
        <h6 className="my-4 text-xl font-bold tracking-tight text-white">Open Order</h6>
      </div>

      <div className="px-32 flex flex-end justify-center">
        <OrderTable data={openOrders} onCancel={handleOnCancel} />
      </div>
    </div>
  );
};

export default OpenOrder;
