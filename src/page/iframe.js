import { createContext, useState ,useEffect,useContext} from "react";
import SesionDAO from "../dao/SesionDAO";
import Login from "./login/login";
import AdminPanel from "./admin/adminPanel";
import ClientePanel from "./cliente/clientePanel";

export const SesionContext= createContext();

const Iframe = () => {
    const [sesion,setSesion] = useState(null);

    useEffect(()=> {
        obtenerSesion();

    }, []);

    const obtenerSesion =async () => {
       let sesionDao = new SesionDAO();
       let respuesta = await sesionDao.obtenerSesion();
       console.log(respuesta);

       if(respuesta.status){
        setSesion(respuesta.data);
       }
    }

    const obtenerMenu = () => {
        if(sesion.admin){
            return <AdminPanel></AdminPanel>
        }else{
            return <ClientePanel></ClientePanel>
        }
    }
    
    return ( 
        <SesionContext.Provider value={{sesion,setSesion}}>
            <div className="iframe">
                {sesion != null ? obtenerMenu() : <Login/>}

                
            </div>
        </SesionContext.Provider>
    

    );
}
 
export default Iframe;