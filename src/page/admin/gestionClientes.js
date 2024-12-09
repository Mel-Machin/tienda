import React, { useState, useEffect } from 'react';
import UsuarioDAO from '../../dao/UsuarioDAO';
import "../../style/gestionClientes.css";

const GestionClientes = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState('todos');

    useEffect(() => {
        const fetchUsuarios = async () => {
            const usuarioDAO = new UsuarioDAO();
            const datos = await usuarioDAO.obtenerUsuarios();
            console.log(datos);
            setUsuarios(datos.data);
        };
        fetchUsuarios();
    }, []);

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const usuariosFiltrados = usuarios.filter(usuario => {
        if (filtro === 'todos') return true;
        if (filtro === 'regular') return !usuario.esPremium;
        if (filtro === 'premium') return usuario.esPremium;
        return true;
    });

    return (
        <div id='GestionClientes'>
            <select onChange={handleFiltroChange} value={filtro} className="filtro-select">
                <option value="todos">Todos</option>
                <option value="regular">Regular</option>
                <option value="premium">Premium</option>
            </select>
            <ul className="usuarios-list">
                {usuariosFiltrados.map(usuario => (
                    <li key={usuario.usuario} className="usuario-item">
                        <div><strong>Nombre:</strong> {usuario.nombre}</div>
                        <div><strong>Apellido:</strong> {usuario.apellido}</div>
                        <div><strong>Tipo de Usuario:</strong> {usuario.esPremium ? 'Premium' : 'Regular'}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GestionClientes;