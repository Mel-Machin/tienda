import React, { useState,useContext } from 'react';
import PanelTienda from './panelTienda';
import PanelHistorial from './panelHistorial';
import '../../style/panelCliente.css';
import SesionDAO from '../../dao/SesionDAO';
import { SesionContext } from '../iframe';
import PanelPerfil from './panelPerfil';

const ClientePanel = () => {
    const [activePanel, setActivePanel] = useState('tienda');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const {setSesion} = useContext(SesionContext);

    const renderPanel = () => {
        switch (activePanel) {
            case 'tienda':
                return <PanelTienda />;
            case 'historial':
                return <PanelHistorial />;
            case 'perfil':
                return <PanelPerfil/>
            default:
                return null;
        }
    };

    const cerrarSesion = async() => {
        let sesionDAO = new SesionDAO();
        let respuesta = await sesionDAO.cerrarSesion();
        if(respuesta.status){
            setSesion(null);
        }else{
            alert(respuesta.message);
        }
    }

    return (
        <div className='panelCliente'>
            <div>
                <button onClick={() => setActivePanel('tienda')}>Tienda</button>
                <button onClick={() => setActivePanel('historial')}>Historial</button>
                <button onClick={() => setShowProfileMenu(!showProfileMenu)}>Perfil</button>
                {showProfileMenu && (
                    <div>
                        <button onClick={() => setActivePanel('perfil')}>Ver Perfil</button>
                        <button onClick={() => cerrarSesion()}>Cerrar Sesión</button>
                    </div>
                )}
            </div>
            <div>
                {renderPanel()}
            </div>
        </div>
    );
};

export default ClientePanel;