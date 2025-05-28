import { useState } from 'react';

import { Calendar, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { localizer, getMessagesES } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {

  const { openDateModal, isDateModalOpen } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  const [currentView, setCurrentView] = useState(localStorage.getItem('lastView') || 'week');
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
      //console.log({Doubleclick: event});
      openDateModal();
  }

  const onSelect = ( event ) => {
      //console.log({Click: event }); 
      setActiveEvent( event );
  }

  const handleViewChange = ( view ) => {
    localStorage.setItem('lastView', view)
    setCurrentView(view); // Actualiza el estado
  };
  
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
        onView={ handleViewChange }
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

    <CalendarModal />
    <FabAddNew />
    {isDateModalOpen ? '': <FabDelete />}
    

    
    </>
  )
}