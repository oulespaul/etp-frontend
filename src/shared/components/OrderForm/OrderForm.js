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
    handleOrder(side, orderDetail);
    setOrderDetail(orderDetailInital);
  };

  return (
    <div className="mt-10 sm:mt-0 shadow-lg">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="p-6 max-w-md bg-[#3d4443] rounded-lg shadow-lg">
          <div className="px-4 py-5 bg-[#3d4443] sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 w-full">
                <div className="mb-4 flex justify-between">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{side}</h5>

                  <OrderTypeDropDown handleOrderType={setOrderType} />
                </div>

                <div className="flex">
                  <input
                    type="number"
                    id="website-admin"
                    name="price"
                    onChange={handleOnchange}
                    value={orderDetail.price}
                    className="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-gray-500 focus:border-gray-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300">
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
                    className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-gray-500 focus:border-gray-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300">
                    Amount
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-[#495352] text-right sm:px-6 rounded-lg">
            <button
              className={`inline-flex justify-center py-2 px-4 border border-transparent 
                  shadow-sm text-sm font-medium rounded-md text-gray-500 
                  bg-gray-300 hover:bg-gray-400 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full mb-4`}
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
                  focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full`}>
              {side}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
