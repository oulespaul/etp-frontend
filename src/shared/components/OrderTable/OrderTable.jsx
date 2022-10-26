import React from 'react';
import dayjs from 'dayjs';

export default function OrderTable({ data, onCancel }) {
  return (
    <div id="app" className="w-full">
      {data.length > 0 ? (
        <>
          {/* Header */}
          <div className="flex items-center px-5 py-2">
            <span className="w-1/4 text-center">
              <span className="text-xs uppercase text-white font-bold">Order Time</span>
            </span>
            <span className="w-1/4 text-center">
              <span className="text-xs uppercase text-white font-bold">Side</span>
            </span>
            <span className="w-1/4 text-center">
              <span className="text-xs uppercase text-white font-bold">Price</span>
            </span>
            <span className="w-1/4 text-center">
              <span className="text-xs uppercase text-white font-bold">Volume</span>
            </span>
            <span className="w-1/4 text-center">
              <span className="text-xs uppercase text-white font-bold">Remaining Volume</span>
            </span>
            <span className="w-1/4 text-center">
              <span className="text-xs uppercase text-white font-bold">Status</span>
            </span>
            <span className="w-1/4">
              <span className="text-xs uppercase text-white font-bold"></span>
            </span>
          </div>

          <div className="overflow-auto h-128">
            {data.map(item => (
              <div className="bg-white shadow flex p-5 items-center mb-5 rounded-lg">
                <div className="w-1/4 text-center">
                  <span className="capitalize text-gray-600 text-sm">
                    {dayjs(item.orderTime).format('DD/MM/YYYY HH:mm:ss')}
                  </span>
                </div>
                <div className="w-1/4 text-center">
                  <span className="capitalize text-gray-600 text-sm">{item.side}</span>
                </div>
                <div className="w-1/4 text-center">
                  <span className="capitalize text-gray-600 text-sm">{item.price}</span>
                </div>
                <div className="w-1/4 text-center">
                  <span className="text-gray-600 text-sm">{item.quantity}</span>
                </div>
                <div className="w-1/4 text-center">
                  <span className="text-gray-600 text-sm">{item.remainingQuantity}</span>
                </div>
                <div className="w-1/4 text-center">
                  <span className="text-gray-600 text-sm">{item.status}</span>
                </div>
                <div className="w-1/4 text-center">
                  <button
                    className={`inline-flex justify-center py-2 px-4 border border-transparent 
                  shadow-sm text-sm font-medium rounded-md text-white
                  bg-red-400 hover:bg-red-500 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-2/3`}
                    onClick={() => {
                      onCancel(item);
                    }}>
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white shadow flex p-5 items-center my-5 rounded-lg justify-center">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-red-400">Open order not found</h5>
        </div>
      )}
    </div>
  );
}
