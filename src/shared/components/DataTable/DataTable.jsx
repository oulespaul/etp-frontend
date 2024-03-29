import React, { useMemo } from 'react';

export default function DataTable({ bid, ask }) {
  const orderbook = useMemo(() => {
    return {
      bid: bid.sort((a, b) => b.price - a.price),
      ask: ask.sort((a, b) => a.price - b.price),
    };
  }, [bid, ask]);
  return (
    <div className="flex flex-col px-8">
      <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden shadow-lg sm:rounded-lg">
            <table className="min-w-full divide-gray-400">
              <thead className="bg-[#212829]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-sm font-medium text-white uppercase tracking-wider">
                    Volume
                  </th>
                  <th scope="col" className="px-6 py-3  text-sm font-medium text-white uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody className="bg-[#3d4443]">
                {new Array(5).fill(0).map((_, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 text-sm text-white">{orderbook.ask[idx]?.qty}</td>
                    <td className="px-6 py-4 text-sm text-red-500">{orderbook.ask[idx]?.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="min-w-full divide-gray-400">
              <thead className="bg-[#495352]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right"></th>
                  <th scope="col" className="px-6 py-3 text-center"></th>
                </tr>
              </thead>
              <tbody className="bg-[#3d4443]">
                {new Array(5).fill(0).map((_, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 text-sm text-white">{orderbook.bid[idx]?.qty}</td>
                    <td className="px-6 py-4 text-sm text-green-500">{orderbook.bid[idx]?.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
