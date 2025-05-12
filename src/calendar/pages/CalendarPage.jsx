import { useState } from 'react';

import { Calendar, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns'
import useDoubleClick from 'use-double-click';

import { CalendarEvent, Navbar } from "../"
import { localizer, getMessagesES } from '../../helpers';


const events = [{
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours( new(Date), 2 ),
  bgColor: '#fAfAfA',
  user: {
    _id: '123',
    name: 'Miguel'
  }
}]

export const CalendarPage = () => {

  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());

  let timer;
  const delay = 300; 

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#4169E1',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  
  const onDoubleClick = ( event ) => {
    clearTimeout(timer); // Clear the timer to prevent single click action
      // Perform double click action
      console.log({Doubleclick: event});
  }

  const onSelect = ( event ) => {
    timer = setTimeout(() => {
        // Perform single click action only if not cleared by double click
        console.log({Click: event }); 
      }, delay);   
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        date={ currentDate }
        view={ currentView }
        onView={ setCurrentView }
        onNavigate={ setCurrentDate }
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }    
        onSelectEvent={ onSelect }    
    />

    </>
  )
}
