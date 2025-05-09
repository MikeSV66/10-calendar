import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours, format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'

import { Navbar } from "../"
import { useState } from 'react';


const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [{
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours( new(Date), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Miguel'
  }
}]

export const CalendarPage = () => {

  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <>
      <Navbar />

      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        date={ currentDate }
        view={ currentView }
        onView={ setCurrentView }
        onNavigate={ setCurrentDate }
        style={{ height: 'cal( 100vh - 80px )' }}
    />

    </>
  )
}
