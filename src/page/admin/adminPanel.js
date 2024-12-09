import {  useState,useContext } from 'react';
import GestionClientes from './gestionClientes';
import GestionCompras from './gestionCompras';
import GestionJuegos from './gestionJuegos';
import '../../style/panelAdmin.css';
import { SesionContext } from '../iframe';
import SesionDAO from '../../dao/SesionDAO';


const AdminPanel = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const {sesion, setSesion} = useContext(SesionContext);

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'clientes':
                return <GestionClientes />;
            case 'compras':
                return <GestionCompras />;
            case 'juegos':
                return <GestionJuegos />;
            default:
                return null;
        }
    };

    const handleLogout =async () => {
        let sesionDAO = new SesionDAO();
        let respuesta = await sesionDAO.cerrarSesion();
        if(respuesta.status){
            setSesion(null);
        }else{
            alert(respuesta.message);
        }
    };

    return (
        <div id='panelAdmin'>
            <nav>
                <ul>
                    <li><button onClick={() => setSelectedComponent('clientes')}>Gestion Clientes</button></li>
                    <li><button onClick={() => setSelectedComponent('compras')}>Gestion Compras</button></li>
                    <li><button onClick={() => setSelectedComponent('juegos')}>Gestion Juegos</button></li>
                    <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
                </ul>
            </nav>
            <div className='main'>
                {renderComponent()}
            </div>
        </div>
    );
}

export default AdminPanel;