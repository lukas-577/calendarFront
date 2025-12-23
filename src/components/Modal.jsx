import React from 'react'
import { Outlet } from 'react-router-dom'
import Axios from './Axios'
import dayjs from 'dayjs';

function Modal({formData, setFormData}) {


    const handleSubmint = (event) =>{
        event.preventDefault()

        const StartDate = dayjs(event.target.fecha.value).format("YYYY-MM-DD");
        const EndDate = dayjs(formData.end["$d"]).format("YYYY-MM-DD")
        const horaFormateada = formData.hora;  
        const nombre = formData.nombre;
        const imagen = formData.file;
        const descripcion = formData.descripcion

        Axios.post(`lugares/`,{
            fecha: StartDate, 
            hora: horaFormateada,
            nombre : nombre,
            descripcion: descripcion,
            imagen: imagen
        })
        .then((res) =>{
            console.log(res)
            window.location.reload()
        })
        .catch((err) => {
            console.error('Error al guardar fecha:', err.response?.data || err.message);
        });

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


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
                    <label for="nombre" class="form-label">Nombre Lugar</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        id="imagen"
                        name="imagen"
                        value={formData.imagen}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <div class="mb-3">
                    <label for="fecha" class="form-label">Fecha</label>
                    <input type="date" class="form-control" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} required></input>
                </div>
                <div class="mb-3">
                    <label for="hora" class="form-label">Hora</label>
                    <input type="time" class="form-control" id="hora" name="hora" value={formData.hora} onChange={handleChange} required></input>
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