import host from "../host";

export default class CompraDAO {
    async comprarMembrasia(){
        let url = host + "/api/compras/comprarMembrasia";
        let config = {
            method: "POST",
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }

    async comprarVideoJuego(idJuego){
        let url = host + "/api/compras/comprarVideoJuego";
        let formData = new FormData();
        formData.append("idJuego", idJuego);
        let config = {
            method: "POST",
            body: formData,
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }

    async obtenerCompras(){
        let url = host + "/api/compras/obtenerCompras";
        let config = {
            method: "GET",
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }

    async obtenerTodasCompras(){
        let url = host + "/api/compras/obtenerTodasCompras";
        let config = {
            method: "GET",
            credentials: "include"
        }
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        return datos;
    }

}