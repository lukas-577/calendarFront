import {React, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import multiMonthPlugin from '@fullcalendar/multimonth'
import esLocale from '@fullcalendar/core/locales/es';
import Axios from '../../components/Axios'
import Modal from '../../components/Modal'

const MyCalendar2 = () => {
  // dayGridDay, dayGridWeek, dayGridMonth, dayGridYear
  // timeGridDay, timeGridWeek
  // listDay, listWeek, listMonth, listYear
  // multiMonthYear

  const [formData, setFormData] = useState({
    start: '', 
    end: ''
  })

  const getData = Axios.get('users')
                    .then(response => console.log(response.data))
                    .catch(error => console.log(error));

  return (
    <>
    <Modal formData={formData}></Modal>
    <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, listPlugin,multiMonthPlugin ]}
        initialView="dayGridMonth"
        locale={esLocale}
        slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
        events={[
            {title : 'Event #1', start: '2025-07-17'},
            {title : 'Event #2', start: '2025-07-19', end: '2025-07-21'},
            {title : 'Event #3', start: '2025-07-01T12:00:00', allDay: false},
        ]}

        views = {{
           multiMonth3:{
              type: 'multiMonth', 
              duration: {months: 3},
              titleFormat: {month: 'short', year: 'numeric'}, 
              columnHeaderFormat: {weekday:'short'},
              buttonText: "3 Months"
           }
        }}

        headerToolbar = {{
          left: 'prev,next' ,
          center: 'title',
          right: 'dayGridMonth, timeGridWeek, listDay, multiMonth3'
        }}
    />
    </>
  )
}

export default MyCalendar2