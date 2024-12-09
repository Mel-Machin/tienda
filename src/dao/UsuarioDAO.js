import host from "../host";

export default class UsuarioDAO {
    async registrar(nombre,apellido,correo,usuario,password){
        let url = host + "/api/usuarios/registrar";
        let formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("apellido", apellido);
        formData.append("correo", correo);
        formData.append("usuario", usuario);
        formData.append("password", password);
        let config = {
            method: "POST",
            body: formData,
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }

    async obtenerUsuarios(){
        let url = host + "/api/usuarios/obtenerUsuarios";
        let config = {
            method: "GET",
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }

}