import { useState } from 'react';
import OrderTypeDropDown from './OrderTypeDropDown';

const orderDetailInital = {
  price: '',
  amount: '',
};

export default function OrderForm({ side, handleOrder }) {
  const [, setOrderType] = useState();
  const [orderDetail, setOrderDetail] = useState(orderDetailInital);

  const handleOnchange = event => {
    const { name, value } = event.target;
    if (value < 0) return;

    setOrderDetail({ ...orderDetail, [name]: parseInt(value) });
  };

  const handleSubmit = () => {
    handleOrder(side, orderDetail)
    setOrderDetail(orderDetailInital)
  }

  return (
    <div className="mt-10 sm:mt-0">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="p-6 max-w-md bg-white rounded-lg border border-gray-200 shadow-md light:bg-gray-800 light:border-gray-700">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 w-full">
                <div className="mb-4 flex justify-between">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 light:text-white">{side}</h5>

                  <OrderTypeDropDown handleOrderType={setOrderType} />
                </div>

                <div className="flex">
                  <input
                    type="number"
                    id="website-admin"
                    name="price"
                    onChange={handleOnchange}
                    value={orderDetail.price}
                    className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                  />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 light:bg-gray-600 light:text-gray-400 light:border-gray-600">
                    Price
                  </span>
                </div>
              </div>

              <div className="col-span-6 w-full">
                <div className="flex">
                  <input
                    type="text"
                    id="website-admin"
                    name="amount"
                    onChange={handleOnchange}
                    value={orderDetail.amount}
                    className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                  />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 light:bg-gray-600 light:text-gray-400 light:border-gray-600">
                    Amount
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              className={`inline-flex justify-center py-2 px-4 border border-transparent 
                  shadow-sm text-sm font-medium rounded-md text-white 
                  bg-gray-300 hover:bg-gray-400 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full mb-4`}
              onClick={() => setOrderDetail(orderDetailInital)}>
              Clear
            </button>

            <button
              onClick={handleSubmit}
              className={`inline-flex justify-center py-2 px-4 border border-transparent 
                  shadow-sm text-sm font-medium rounded-md text-white 
                  ${
                    side === 'Buy' ? 'bg-green-400 hover:bg-green-500' : 'bg-red-400 hover:bg-red-500'
                  } focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full`}>
              {side}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
