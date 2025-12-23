import Axios from "../components/Axios";

export const getLugares = async () => {
    const response = await Axios.get("/lugares");
    return response.data;
};

export const uploadLugar = async ({ nombre, descripcion, imagen}) => {

    const response = await Axios.post("/lugares",{
        nombre,
        descripcion,
        imagen
    });

    return response.data;
};