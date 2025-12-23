import React, { useState, useEffect } from "react";
import Axios from "./Axios";

export default function SelectorDeHorario() {
  const [lugares, setLugares] = useState([]);
  const [lugarSeleccionado, setLugarSeleccionado] = useState(null);

  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

  //Cargar lugares
  useEffect(() => {
    Axios.get("/lugares")
      .then(res => {setLugares(res.data), console.log(res.data)})
      .catch(err => console.error("Error al cargar lugares:", err));
  }, []);

  //Cuando cambia la fecha, cargar horarios
  useEffect(() => {
    if (!lugarSeleccionado || !fechaSeleccionada) {
      setHorarios([]);
      return;
    }

    const horariosDisponibles = lugarSeleccionado.fechas
      .filter(f => f.fecha.startsWith(fechaSeleccionada))
      .map(f => f.horario);

    setHorarios(horariosDisponibles);
    setHorarioSeleccionado("");
  }, [fechaSeleccionada, lugarSeleccionado]);

  //Manejar selección de lugar
  const handleLugarChange = (id) => {
    const lugar = lugares.find(l => l.id === Number(id));
    setLugarSeleccionado(lugar);
    setFechaSeleccionada("");
    setHorarios([]);
    setHorarioSeleccionado("");
  };

  //Fechas únicas
  const fechasDisponibles = lugarSeleccionado
    ? [...new Set(lugarSeleccionado.fechas.map(f => f.fecha.split("T")[0]))]
    : [];

  return (
    <div style={{
      width: 400,
      margin: "20px auto",
      padding: 20,
      background: "#2b2b3c",
      color: "white",
      borderRadius: 12
    }}>
      <h3 style={{ textAlign: "center" }}>Reservar turno</h3>

      {/* LUGAR */}
      <label>Lugar</label>
      <select className="form-select" onChange={(e) => handleLugarChange(e.target.value)}>
        <option value="">Seleccionar lugar...</option>
        {lugares.map(l => (
          <option key={l.id} value={l.id}>
            {l.nombre}
          </option>
        ))}
      </select>
      

      {/* FECHA */}
      <label style={{ marginTop: 15 }}>Fecha</label>
      <input
        type="date"
        className="form-control"
        value={fechaSeleccionada}
        onChange={(e) => setFechaSeleccionada(e.target.value)}
        disabled={!lugarSeleccionado}
        min={fechasDisponibles[0]}
        max={fechasDisponibles[fechasDisponibles.length - 1]}
      />

      {/* HORARIO */}
      <label style={{ marginTop: 15 }}>Horario</label>
      <select
        className="form-select"
        value={horarioSeleccionado}
        onChange={(e) => setHorarioSeleccionado(e.target.value)}
        disabled={!horarios.length}
      >
        <option value="">Seleccionar horario...</option>
        {horarios.map(h => (
          <option key={h} value={h}>{h}</option>
        ))}
      </select>

      {/* BOTÓN */}
      <button
        className="btn btn-primary w-100 mt-3"
        disabled={!lugarSeleccionado || !fechaSeleccionada || !horarioSeleccionado}
      >
        Confirmar reserva
      </button>
    </div>
  );
}
