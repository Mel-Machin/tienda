import host from "../host";

export default class SesionDAO {

    obtenerSesion = async () => {
        let url = host + "/api/sesion/obtenerSesion";
        let config = {
            method: "GET",
            credentials: "include"
        }
        const respuesta = await fetch(url, config);

        const datos = await respuesta.json();
        return datos;
    }

    iniciarSesion = async (usuario, password) => {
        let url = host + "/api/sesion/iniciarSesion";
        let formData = new FormData();
        formData.append("usuario", usuario);
        formData.append("password", password);
        let config = {
            method: "POST",
            body: formData,
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        console.log(datos);
        return datos;
    }

    cerrarSesion = async () => {
        let url = host + "/api/sesion/cerrarSesion";
        let config = {
            method: "GET",
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }
}