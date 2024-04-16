import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarComponent = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDates([...selectedDates, date]);
  };

  return (
    <div>
      <h2>Select Dates</h2>
      <DatePicker
        selected={null} // Pass null for controlled component
        onChange={handleDateChange}
        inline
        selectsRange
        startDate={selectedDates.length > 0 ? selectedDates[0] : null}
        endDate={selectedDates.length > 0 ? selectedDates[selectedDates.length - 1] : null}
      />
      <div>
        Selected Dates:
        {selectedDates.map((date, index) => (
          <span key={index}>{date.toDateString()}, </span>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
