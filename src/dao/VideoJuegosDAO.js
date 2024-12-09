import host from "../host";

export default class VideoJuegosDAO {
    async registrar(nombre,precio,descripcion,imagen,idCategoria){
        let url = host + "/api/videojuegos/registrar";
        let formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("precio", precio);
        formData.append("descripcion", descripcion);
        formData.append("imagen", imagen);
        formData.append("idCategoria", idCategoria);
        let config = {
            method: "POST",
            body: formData,
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }

    async obtener(){
        let url = host + "/api/videojuegos/obtener";
        let config = {
            method: "GET",
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }

    async obtenerPorId(id){
        let url = host + "/api/videojuegos/obtenerPorId?id="+id;
        let config = {
            method: "GET",
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }

    async actualizar(id,nombre,precio,descripcion,imagen,idCategoria){
        let url = host + "/api/videojuegos/actualizar";
        let formData = new FormData();
        formData.append("id", id);
        formData.append("nombre", nombre);
        formData.append("precio", precio);
        formData.append("descripcion", descripcion);
        formData.append("imagen", imagen);
        formData.append("idCategoria", idCategoria);
        let config = {
            method: "PUT",
            body: formData,
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }

    async eliminar(id){
        let url = host + "/api/videojuegos/eliminar/"+id;
        let config = {
            method: "DELETE",
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }

    async registrarNuevaCopiaJuego(idJuego,codigo){
        let url = host + "/api/videojuegos/registrarNuevaCopiaJuego";
        let formData = new FormData();
        formData.append("idVideoJuego", idJuego);
        formData.append("codigo", codigo);
        let config = {
            method: "POST",
            body: formData,
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }

    async obtenerCategorias(){
        let url = host + "/api/videojuegos/obtenerCategorias";
        let config = {
            method: "GET",
            credentials: "include"
        }
        const respuesta = await fetch(url, config);

        const datos = await respuesta.json();
        return datos;
    }
    


    
}