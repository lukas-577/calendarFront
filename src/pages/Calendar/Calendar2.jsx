import {React, useState, useEffect} from 'react'
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
    end: '',
    hora: '',
    titulo: '',
    fecha: ''
  });

  const getData = Axios.get('fechas')
                    .then(response => console.log(response.data))
                    .catch(error => console.log(error));

  const [events, setEvents] = useState([]); // Estado para los eventos

  useEffect(() => {
    Axios.get('fechas')
      .then(response => {
        console.log('Datos del backend:', response.data);
        
        const eventosFormateados = response.data.map(item => ({
          title: item.titulo,
          start: item.hora
            ? `${item.fecha}T${item.hora}` // evento con hora específica
            : item.fecha, // evento de todo el día
        }));

        setEvents(eventosFormateados);
      })
      .catch(error => console.error('Error al obtener eventos:', error));
  }, []);

  return (
    <>
    <Modal formData={formData} setFormData={setFormData}></Modal>
    <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, listPlugin,multiMonthPlugin ]}
        initialView="dayGridMonth"
        locale={esLocale}
        slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
        events={events}

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