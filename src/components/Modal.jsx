import React from 'react'
import { Outlet } from 'react-router-dom'
import Axios from './Axios'
import dayjs from 'dayjs';

function Modal({formData}) {


    const handleSubmint = (event) =>{
        event.preventDefault()

        const StartDate = dayjs(formData.start["$d"]).format("YYYY-MM-DD")
        const EndDate = dayjs(formData.end["$d"]).format("YYYY-MM-DD")

        Axios.post(`users/`,{
        id:2,
        name: StartDate, 
        email: EndDate, 
        })
        .then((res) =>{
        console.log(res)
        window.location.reload()
        })

    }


    return (
        <>

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#agendaModal">
        Agendar Hora
        </button>

  
        <div class="modal fade" id="agendaModal" tabindex="-1" aria-labelledby="agendaModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <form id="formAgenda" onSubmit={handleSubmint}>
                <div class="modal-header">
                <h5 class="modal-title" id="agendaModalLabel">Agendar Hora</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                <div class="mb-3">
                    <label for="fecha" class="form-label">Fecha</label>
                    <input type="date" class="form-control" id="fecha" name="fecha" required></input>
                </div>
                <div class="mb-3">
                    <label for="hora" class="form-label">Hora</label>
                    <input type="time" class="form-control" id="hora" name="hora" required></input>
                </div>
                </div>
                <div class="modal-footer">
                <button type="submit" class="btn btn-success">Agendar</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </form>
            </div>
        </div>
        </div>
        </>
    )
}

export default Modal