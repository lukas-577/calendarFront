import Axios from "../components/Axios";

export const getFechas = async () => {
    const res = await Axios.get("/fechas");
    return res.data;
};