import {React, useState, useEffect} from "react";
import FormLugar from "../../components/FormLugar";
import { getLugares, uploadLugar } from "../../services/lugares.services";
import { subirImagen } from "../../services/subirImagen.services";

function Lugares(){

    const [imagen, setImagen] = useState(null);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [lugares, setLugares] = useState([]);

    useEffect(() => {
        const getLugaresData = async () => {
            try {
                const lugaresData = await getLugares();
                setLugares(lugaresData);
                console.log("Lugares obtenidos:", lugaresData);
            }
            catch (error) {
                console.error("Error al obtener los lugares:", error);
            }
        };
        getLugaresData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const imagenUrl = await subirImagen(imagen);
            console.log("Imagen subida a URL:", imagenUrl);    
            await uploadLugar({
                nombre,
                descripcion,
                imagen: imagenUrl,
            });

            alert("Lugar guardado correctamente");
            // actualizar estado aquí, NO reload
        } catch (error) {
            console.error(error);
            alert("Error al guardar el lugar");
        }
        // reload 
        window.location.reload();
    };

    return(
        <>
        <FormLugar
            label="Imagen"
            accept="image/*"
            nombre={nombre}
            descripcion={descripcion}
            onNombreChange={(e) => setNombre(e.target.value)}
            onDescripcionChange={(e) => setDescripcion(e.target.value)}
            onFileChange={(e) => setImagen(e.target.files[0])}
            onSubmit={handleSubmit}
            onFechaChange={(id) => setFechaId(id)}
        />
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {lugares.map((lugar) => (
                <div className="col" key={lugar.id}>
                <div className="card h-100">
                    <img
                    src={`${import.meta.env.VITE_API_URL}${lugar.imagen}`}
                    className="card-img-top img-fluid"
                    alt={lugar.nombre}
                    />
                    <div className="card-body">
                    <h5 className="card-title">{lugar.nombre}</h5>
                    <p className="card-text">{lugar.descripcion}</p>
                    </div>
                </div>
                </div>
            ))}
        </div>

        </>
    )
}

export default Lugares