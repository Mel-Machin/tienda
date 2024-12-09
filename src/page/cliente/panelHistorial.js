import React, { useEffect, useState } from 'react';
import CompraDAO from '../../dao/CompraDAO';
import '../../style/panelHistorial.css'

const PanelHistorial = () => {
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        const fetchCompras = async () => {
            const compraDAO = new CompraDAO();
            const datos = await compraDAO.obtenerCompras();
            console.log(datos)
            setCompras(datos.data);
        };

        fetchCompras();
    }, []);

    return (
        <div>
            <h2>Historial de Compras</h2>
            <ul>
                {compras.map((compra) => (
                    <li key={compra.id}>
                        <div>
                            <p>{`Fecha de Compra: ${new Date(compra.fechaCompra).toLocaleString()}`}</p>
                            <p>{`Coste Final: ${compra.costeFinal}`}</p>
                            <p>{`Código: ${compra.copiaJuego.codigo}`}</p>
                            <p>{`Juego: ${compra.copiaJuego.videoJuego.nombre}`}</p>
                            <p>{`Descripción: ${compra.copiaJuego.videoJuego.descripcion}`}</p>
                            <p>{`Precio: ${compra.copiaJuego.videoJuego.precio}`}</p>
                            <p>{`Categoría: ${compra.copiaJuego.videoJuego.categoria.nombre}`}</p>
                            <img src={`data:image/jpeg;base64,${compra.copiaJuego.videoJuego.imagen}`} alt={compra.copiaJuego.videoJuego.nombre} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PanelHistorial;