import React, { forwardRef, useImperativeHandle } from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';

const timeOptions = [...Array(24 + 1).keys()].slice(1).map(time => ({ id: time, time }));

const TimePicker = forwardRef(({ onSelect }, ref) => {
  const [selected, setSelected] = useState(0);

  const handleOnChange = event => {
    const value = event.target.value;
    let timeSelected = dayjs().add(value, 'hour');

    if (+value !== 0) {
      timeSelected = timeSelected.set('minute', 0).set('second', 0);
    }

    setSelected(event.target.value);
    onSelect(timeSelected);
  };

  const reset = () => {
    setSelected(0);
  };

  useImperativeHandle(ref, () => ({
    reset: reset,
  }));

  return (
    <div className="mt-2 p-2 w-full bg-white rounded-lg shadow-xl">
      <div className="flex">
        <select
          value={selected}
          name="hours"
          className="bg-transparent text-base appearance-none outline-none"
          onChange={handleOnChange}>
          <option value={0}>Current Time</option>

          {timeOptions.map(item => (
            <option key={item.id} value={item.time}>
              {/* {item.time.format('DD/MM/YYYY HH:mm:ss')} */}
              {dayjs().add(item.time, 'hour').set('minute', 0).set('second', 0).format('DD/MM/YYYY HH:mm:ss')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default TimePicker;
