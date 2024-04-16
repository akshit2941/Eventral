import React, { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import './calendar.css';

function CalendarContent() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [userId, setUserId] = useState(null);


  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  })

  const saveDataToFirestore = async () => {
    try {
      if (!userId) {
        throw new Error('User not logged in');
      }
  
      const ArtistData = { ArtistSelectedDate: selectedDate ? selectedDate.toISOString() : null };
      const docRef = doc(db, "artists", userId);
  
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const existingScheduleData = docSnapshot.data().scheduleData || [];
        existingScheduleData.push(ArtistData); // Use ArtistData instead of newScheduleItem
        await updateDoc(docRef, { scheduleData: existingScheduleData });
      } else {
        console.error("Document does not exist");
      }
    } catch (error) {
      console.error("Error saving data to Firestore:", error.message);
    }
  };
  



  const handleButtonClick = () => {
    try {
      if (!selectedDate) {
        throw new Error('No date selected');
      }
      saveDataToFirestore();
      console.log(selectedDate);
    } catch (error) {
      console.error('Error handling button click:', error);
    }
  };

  const handleDateChange = (date) => {
    try {
      setSelectedDate(date);
    } catch (error) {
      console.error('Error setting selected date:', error);
    }
  };


  return (
    <div className='calendar-main'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Pick Date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </DemoContainer>
      </LocalizationProvider>

      <div className='schedule-button'>
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
        >
          Update Schedule
        </Button>
      </div>
    </div>
  );
}

export default CalendarContent;
