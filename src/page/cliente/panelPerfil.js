import React, { useContext } from 'react';
import { SesionContext } from '../iframe';
import CompraDAO from '../../dao/CompraDAO';
import SesionDAO from '../../dao/SesionDAO';


const PanelPerfil = () => {
    const { setSesion, sesion } = useContext(SesionContext);

    const handleComprarPremium = async () => {
        const compraDAO = new CompraDAO();
        const sesionDAO = new SesionDAO();
        const respuesta = await compraDAO.comprarMembrasia();
        console.log(respuesta)
        if(respuesta.status){
            const nuevaSesion = await sesionDAO.obtenerSesion();
            console.log(nuevaSesion);
            setSesion(nuevaSesion.data);
        }

       
    };

    return (
        <div>
            <h1>Perfil de Usuario</h1>
            <p>Usuario: {sesion.usuario}</p>
            <p>Nombre: {sesion.nombre}</p>
            <p>Apellido: {sesion.apellido}</p>
            <p>Correo: {sesion.correo}</p>
            <p>Fecha de Registro: {new Date(sesion.fechaRegistro).toLocaleDateString()}</p>
            <p>Es Premium: {sesion.esPremium ? 'Sí' : 'No'}</p>
            {!sesion.esPremium && <button onClick={handleComprarPremium}>Comprar Premium</button>}
        </div>
    );
}

export default PanelPerfil;