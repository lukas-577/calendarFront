import Axios from "../components/Axios";
export const subirImagen = async (imagen) => {
    try {
        const formData = new FormData();
        formData.append("imagen", imagen);
        formData.append("nombre", "imagen-lugar");

        console.log("ENVIANDO IMAGEN:", imagen);
        console.log("ES FILE?:", imagen instanceof File);

        const res = await Axios.post("lugares/upload", formData);

        console.log("RESPUESTA UPLOAD:", res.data);

        return res.data.imagen;
    } catch (error) {
        console.error("ERROR EN subirImagen:", error);
        console.error("ERROR RESPONSE:", error.response?.data);
        throw error; // 👈 vuelve a lanzar el error
    }
};
export default subirImagen;