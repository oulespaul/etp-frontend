import React from 'react';
import dayjs from 'dayjs';

export default function TimePicker({ onSelect }) {
  const handleOnChange = event => {
    const timeSelected = new Date(parseInt(event.target.value));

    onSelect(timeSelected);
  };

  const timeOptions = [...Array(24 + 1).keys()]
    .slice(1)
    .map(time => dayjs().add(time, 'hour').set('minute', 0).set('second', 0));

  return (
    <div className="mt-2 p-2 w-full bg-white rounded-lg shadow-xl">
      <div className="flex">
        <select
          name="hours"
          className="bg-transparent text-base appearance-none outline-none"
          onChange={handleOnChange}>
          <option value={null}>Current Time</option>

          {timeOptions.map(time => (
            <option key={time} value={time}>
              {time.format('DD/MM/YYYY HH:mm:ss')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
