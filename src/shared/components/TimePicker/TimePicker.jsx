import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function TimePicker({ onSelect, isClear }) {
  const [selected, setSelected] = useState(null);

  const handleOnChange = event => {
    const timeSelected = new Date(parseInt(event.target.value));

    setSelected(event.target.value);
    onSelect(timeSelected);
  };

  const timeOptions = [...Array(24 + 1).keys()]
    .slice(1)
    .map(time => ({ id: time, time: dayjs().add(time, 'hour').set('minute', 0).set('second', 0) }));

  useEffect(() => {
    if (isClear === true) {
      setSelected(null);
    }
  }, [isClear]);

  return (
    <div className="mt-2 p-2 w-full bg-white rounded-lg shadow-xl">
      <div className="flex">
        <select
          name="hours"
          className="bg-transparent text-base appearance-none outline-none"
          onChange={handleOnChange}>
          <option value={null} defaultValue={selected === null}>
            Current Time
          </option>

          {timeOptions.map(item => (
            <option key={item.id} value={item.time} defaultValue={item.time === selected}>
              {item.time.format('DD/MM/YYYY HH:mm:ss')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
