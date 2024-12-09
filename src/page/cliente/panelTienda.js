import { useContext, useEffect, useState } from "react";
import VideoJuegosDAO from "../../dao/VideoJuegosDAO";
import CompraDAO from "../../dao/CompraDAO";
import "../../style/panelTienda.css";
import { SesionContext } from '../iframe';

const PanelTienda = () => {

    const [productos, setProductos] = useState([]);
    const { setSesion, sesion } = useContext(SesionContext);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        let videojuegosDAO = new VideoJuegosDAO();
        let respuesta = await videojuegosDAO.obtener();
        console.log(respuesta);
        if (respuesta.status) {
            setProductos(respuesta.data);
        } else {
            alert(respuesta.message);
        }
    }

    const comprar = async (idJuego) => {
        let compraDAO = new CompraDAO();
        let respuesta = await compraDAO.comprarVideoJuego(idJuego);
        console.log(respuesta)
        if (respuesta.status) {
            alert("Compra realizada con éxito");
            obtenerProductos();
        } else {
            alert(respuesta.message);
        }
    };

    return (
        <div className="tienda">
            {productos.map((producto) => {
                const precioOriginal = producto.precio;
                const precioConDescuento = sesion.esPremium ? precioOriginal * 0.8 : precioOriginal;

                return (
                    <div key={producto.id} className="producto">
                        <h3 className="producto-nombre"><strong>Nombre:</strong> {producto.nombre}</h3>
                        <p className="producto-descripcion"><strong>Descripción:</strong> {producto.descripcion}</p>
                         <p className="producto-stock"><strong>Stock:</strong> {producto.stock}</p>
                        <p className="producto-precio">
                            <strong>Precio:</strong> ${precioConDescuento.toFixed(2)}
                            {sesion.esPremium && (
                                <>
                                    <span className="usuario-premium"> (Usuario Premium)</span>
                                    <br />
                                    <span className="precio-original">
                                        <s>Original: ${precioOriginal.toFixed(2)}</s>
                                    </span>
                                </>
                            )}
                        </p>
                        {producto.imagen && <img src={`data:image/jpeg;base64,${producto.imagen}`} alt={producto.nombre} className="producto-imagen" />}
                        <p className="producto-categoria"><strong>Categoría:</strong> {producto.categoria.nombre}</p>
                        {producto.stock > 0 ? (
                            <button className="producto-comprar" onClick={() => comprar(producto.id)}>Comprar</button>
                        ) : (
                            <p className="producto-sin-stock">Sin stock</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default PanelTienda;