import { useEffect, useState } from 'react';
// import OrderTypeDropDown from './OrderTypeDropDown';
import { toast } from 'react-toastify';
import TimePicker from '../TimePicker/TimePicker';
import dayjs from 'dayjs';

const orderDetailInital = {
  price: '',
  quantity: '',
  orderTime: dayjs(),
};

export default function OrderForm({ side, handleOrder, order }) {
  const [orderType] = useState('limit');
  const [orderDetail, setOrderDetail] = useState(orderDetailInital);

  useEffect(() => {
    if (orderType === 'market') {
      setOrderDetail({ ...orderDetail, price: order[0]?.price });
    }
  }, [order, orderDetail, orderType]);

  const handleOnchange = event => {
    const { name, value } = event.target;

    setOrderDetail({ ...orderDetail, [name]: parseFloat(value) });
  };

  const handleSubmit = () => {
    if (orderDetail.price % 0.25 !== 0) {
      toast.error('Range of price is not 0.25', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    if (orderDetail.quantity % 0.5 !== 0) {
      toast.error('Range of amount is not 0.50', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    handleOrder(side.toLowerCase(), orderDetail, orderType);
    setOrderDetail(orderDetailInital);
  };

  const handleOnSelect = time => {
    setOrderDetail({ ...orderDetail, orderTime: time });
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

                  {/* <OrderTypeDropDown handleOrderType={setOrderType} /> */}
                </div>

                <div className="flex">
                  <input
                    type="number"
                    id="website-admin"
                    name="price"
                    onChange={handleOnchange}
                    value={orderDetail.price}
                    placeholder="range of price is 0.25"
                    step="0.25"
                    disabled={orderType === 'market'}
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
                    type="number"
                    id="website-admin"
                    name="quantity"
                    onChange={handleOnchange}
                    value={orderDetail.quantity}
                    placeholder="range of amount is 0.50"
                    step="0.50"
                    className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-gray-500 focus:border-gray-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300">
                    kWh
                  </span>
                </div>
              </div>

              <div className="col-span-6 w-full">
                <span className="inline-flex items-center text-lg text-white">Schedule Time</span>

                <div className="flex">
                  <TimePicker onSelect={handleOnSelect} />
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
