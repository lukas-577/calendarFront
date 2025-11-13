import React, { useState, useEffect } from 'react';
import Axios from './Axios';

function SelectorDeHorario() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [horariosReservados, setHorariosReservados] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Cuando cambia la fecha, consultar los horarios reservados de ese día
  const handleFechaChange = async (e) => {
    const fecha = e.target.value;
    setFechaSeleccionada(fecha);

    if (!fecha) return;

    setCargando(true);
    try {
      const res = await Axios.get(`fechas?fecha=${fecha}`);
      console.log(res);
      setHorariosReservados(res.data.map((h) => h.hora));
    } catch (err) {
      console.error('Error al obtener horarios:', err);
    } finally {
      setCargando(false);
    }
  };

  // Horarios base fijos
  const horariosBase = [
    ['12:30', '13:30'],
    ['13:50', '14:50'],
    ['15:10', '16:10'],
    ['16:30', '17:30'],
    ['17:50', '18:50'],
    ['19:10', '20:10'],
    ['20:30', '21:30'],
  ];

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <div className="card shadow-lg p-4" style={{ width: '400px', backgroundColor: '#2b2b3c', color: 'white', borderRadius: '1rem' }}>
        <h4 className="text-center mb-4">Selecciona tu horario</h4>

        {/* Selector de fecha */}
        <div className="mb-3">
          <label className="form-label">Seleccionar fecha</label>
          <div className="input-group">
            <span className="input-group-text bg-secondary text-white">
              <i className="bi bi-calendar"></i>
            </span>
            <input
              type="date"
              className="form-control"
              value={fechaSeleccionada}
              onChange={handleFechaChange}
            />
          </div>
        </div>

        {/* Selector de horario */}
        <div className="mb-3">
          <label className="form-label">Seleccionar horario</label>
          <div className="input-group">
            <span className="input-group-text bg-secondary text-white">
              <i className="bi bi-clock"></i>
            </span>
            <select className="form-select">
              <option value="">
                {cargando ? 'Cargando horarios...' : 'Seleccionar horario'}
              </option>
              {!cargando &&
                horariosBase.map(([inicio, fin], index) => {
                  const reservado = horariosReservados.includes(inicio);
                  return (
                    <option key={index} disabled={reservado}>
                      {inicio} - {fin} {reservado ? ' - Reservado' : ''}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-primary w-100" disabled={cargando || !fechaSeleccionada}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectorDeHorario;
