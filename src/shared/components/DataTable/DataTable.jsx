import React, { useMemo } from 'react';

export default function DataTable({bid, ask}) {
  const orderbook = useMemo(() => {
    return {
      bid: bid.sort((a, b) => b.price - a.price),
      ask: ask.sort((a, b) => a.price - b.price)
    }
  }, [bid,ask])
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border border-gray-200 shadow-md light:bg-gray-800 light:border-gray-700 sm:rounded-lg">
            <table className="min-w-full divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volume
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bids
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Offers
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volume
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {new Array(7).fill(0).map((_, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 text-right text-sm text-gray-500">{orderbook.bid[idx]?.amount}</td>
                    <td className="px-6 py-4 text-center text-sm text-green-500">{orderbook.bid[idx]?.price}</td>
                    <td className="px-6 py-4 text-center text-sm text-red-500">{orderbook.ask[idx]?.price}</td>
                    <td className="px-6 py-4 text-left text-sm text-gray-500">{orderbook.ask[idx]?.amount}</td>
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
