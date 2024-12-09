import React, { useState, useEffect } from 'react';
import CompraDAO from '../../dao/CompraDAO';
import UsuarioDAO from '../../dao/UsuarioDAO';
import "../../style/gestionCompra.css";

const GestionCompras = () => {
    const [compras, setCompras] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [filtroUsuario, setFiltroUsuario] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');

    useEffect(() => {
        const fetchCompras = async () => {
            let compraDAO = new CompraDAO();
            const todasCompras = await compraDAO.obtenerTodasCompras();
            console.log(todasCompras);
            setCompras(todasCompras.data);
        };

        const fetchUsuarios = async () => {
            let usuarioDAO = new UsuarioDAO();
            const todosUsuarios = await usuarioDAO.obtenerUsuarios();
            console.log(todosUsuarios.data)
            setUsuarios(todosUsuarios.data);
        };

        fetchCompras();
        fetchUsuarios();
    }, []);

    const handleFiltroUsuarioChange = (e) => {
        setFiltroUsuario(e.target.value);
    };

    const handleFiltroFechaChange = (e) => {
        setFiltroFecha(e.target.value);
    };

    const comprasFiltradas = compras.filter(compra => {
        const fechaCompra = new Date(compra.fechaCompra);
        const filtroFechaDate = filtroFecha ? new Date(`${filtroFecha}T00:00:00`) : null;
    
        console.log("compra", compra.fechaCompra);
        console.log("filtro", filtroFecha);
    
        // Compara solo la fecha sin las horas
        const esMismaFecha = filtroFechaDate
            ? fechaCompra.getFullYear() === filtroFechaDate.getFullYear() &&
              fechaCompra.getMonth() === filtroFechaDate.getMonth() &&
              fechaCompra.getDate() === filtroFechaDate.getDate()
            : true;
        console.log(compra.usuario.usuario)
        return (filtroUsuario ? compra.usuario.usuario === filtroUsuario : true) && esMismaFecha;
    });
    
    

    return (
        <div id='gestionCompra'>
            <div>
                <label>Filtrar por usuario:</label>
                <select value={filtroUsuario} onChange={handleFiltroUsuarioChange}>
                    <option value="">Todos</option>
                    {usuarios.map(usuario => (
                        <option key={usuario.usuario} value={usuario.usuario}>{usuario.usuario}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Filtrar por fecha:</label>
                <input type="date" value={filtroFecha} onChange={handleFiltroFechaChange} />
            </div>
            <div>
                <h2>Lista de Compras</h2>
                <ul>
                    {comprasFiltradas.map(compra => (
                        <li key={compra.id}>
                            <p>Descripción: {compra.descripcion}</p>
                            <p>Fecha: {compra.fechaCompra}</p>
                            <p>Usuario: {compra.usuario.usuario}</p>
                            <p>Nombre:{compra.usuario.nombre} </p>
                            <p>Apellido:{compra.usuario.apellido} </p>
                            <p>Correo: {compra.usuario.correo}</p>
                            <p>Coste Final: {compra.costeFinal}</p>
                            <p>Videojuego: {compra.copiaJuego.videoJuego.nombre}</p>
                            <p>Descripción del Videojuego: {compra.copiaJuego.videoJuego.descripcion}</p>
                            <p>Precio: {compra.copiaJuego.videoJuego.precio}</p>
                            <p>Categoría: {compra.copiaJuego.videoJuego.categoria.nombre}</p>
                            <p>Código: {compra.copiaJuego.codigo}</p>
                            <p>Vendido: {compra.copiaJuego.vendido ? 'Sí' : 'No'}</p>
                            {compra.copiaJuego.videoJuego.imagen && <img src={`data:image/jpeg;base64,${compra.copiaJuego.videoJuego.imagen}`} alt={compra.copiaJuego.videoJuego.nombre} className="producto-imagen" />}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GestionCompras;