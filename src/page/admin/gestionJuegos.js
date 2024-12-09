import React, { useState, useEffect, useRef } from 'react';
import VideoJuegosDAO from '../../dao/VideoJuegosDAO';
import "../../style/gestionJuegos.css";
const videoJuegosDAO = new VideoJuegosDAO();

const GestionJuegos = () => {
    const [videoJuegos, setVideoJuegos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);
    const [idCategoria, setIdCategoria] = useState('');
    const [id, setId] = useState(null);
    const [codigo, setCodigo] = useState('');
    const [stockFiltro, setStockFiltro] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        obtenerVideoJuegos();
        obtenerCategorias();
    }, []);

    const obtenerVideoJuegos = async () => {
        const datos = await videoJuegosDAO.obtener();
        console.log(datos);
        setVideoJuegos(datos.data);
    };

    const obtenerCategorias = async () => {
        const datos = await videoJuegosDAO.obtenerCategorias();
        console.log(datos);
        setCategorias(datos.data);
    };

    const registrarVideoJuego = async () => {
        await videoJuegosDAO.registrar(nombre, precio, descripcion, imagen, idCategoria);
        obtenerVideoJuegos();
        limpiarFormulario();
    };

    const actualizarVideoJuego = async () => {
        await videoJuegosDAO.actualizar(id, nombre, precio, descripcion, imagen, idCategoria);
        obtenerVideoJuegos();
        limpiarFormulario();
    };

    const eliminarVideoJuego = async (id) => {
        let respuesta = await videoJuegosDAO.eliminar(id);
        console.log(respuesta);
        if(respuesta.status){
            obtenerVideoJuegos();
        }else{
            alert("No se pueden eliminar juegos con ventas realizadas")
        }
       
    };

    const registrarNuevaCopiaJuego = async (idJuego, codigo) => {
        await videoJuegosDAO.registrarNuevaCopiaJuego(idJuego, codigo);
        obtenerVideoJuegos();
    };

    const seleccionarVideoJuego = (videoJuego) => {
        setId(videoJuego.id);
        setNombre(videoJuego.nombre);
        setPrecio(videoJuego.precio);
        setDescripcion(videoJuego.descripcion);
        setIdCategoria(videoJuego.categoria.id);
        setImagen(videoJuego.imagen);
    };

    const limpiarFormulario = () => {
        setId(null);
        setNombre('');
        setPrecio('');
        setDescripcion('');
        setImagen(null);
        setIdCategoria('');
        setCodigo('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleStockFiltroChange = (e) => {
        setStockFiltro(e.target.value);
    };

    const videojuegosFiltrados = videoJuegos.filter(videoJuego => {
        return stockFiltro === '' || videoJuego.stock <= parseInt(stockFiltro, 10);
    });

    return (
        <div className="gestion-juegos">
            <h1>Gestión de Videojuegos</h1>
            <div className="formulario">
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type="text" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <input type="file" ref={fileInputRef} onChange={(e) => setImagen(e.target.files[0])} />
                <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
                <button onClick={registrarVideoJuego}>Registrar</button>
                <button onClick={actualizarVideoJuego}>Actualizar</button>
            </div>
            <div className="filtro-stock">
                <input type="number" placeholder="Stock menor a" value={stockFiltro} onChange={handleStockFiltroChange} />
            </div>
            <div className="lista-videojuegos">
                <h2>Lista de Videojuegos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th>Stock</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videojuegosFiltrados.map((videoJuego) => (
                            <tr key={videoJuego.id}>
                                <td><img src={`data:image/jpeg;base64,${videoJuego.imagen}`} alt={videoJuego.nombre} width="100" /></td>
                                <td>{videoJuego.nombre}</td>
                                <td>{videoJuego.precio}</td>
                                <td>{videoJuego.descripcion}</td>
                                <td>{videoJuego.stock}</td>
                                <td>{videoJuego.categoria.nombre}</td>
                                <td>
                                    <button onClick={() => seleccionarVideoJuego(videoJuego)}>Editar</button>
                                    <button onClick={() => eliminarVideoJuego(videoJuego.id)}>Eliminar</button>
                                    <button onClick={() => {
                                        const codigo = prompt('Ingrese el código de la nueva copia:');
                                        if (codigo) {
                                            registrarNuevaCopiaJuego(videoJuego.id, codigo);
                                        }
                                    }}>Agregar Copia</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionJuegos;