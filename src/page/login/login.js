import { useContext, useState } from "react";
import '../../style/login.css';
import SesionDAO from "../../dao/SesionDAO";
import UsuarioDAO from "../../dao/UsuarioDAO";
import { SesionContext } from "../iframe";


const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const {setSesion,sesion} = useContext(SesionContext);
    const handleToggle = () => {
        setIsRegister(!isRegister);
    };

    const handleLogin = async(e) => {
        e.preventDefault();
        let form = e.target;
        let usuario = form.username.value;
        let password = form.password.value;
        let sesionDAO = new SesionDAO();
        let respuesta = await sesionDAO.iniciarSesion(usuario, password);
        if(respuesta.status){
            let usuario = respuesta.data;
            setSesion(usuario);
        }else{
            alert(respuesta.message);
        }
    }
    const handleRegister = async(e) => {
        e.preventDefault();
        let form = e.target;
        let nombre = form.firstName.value;
        let apellido = form.lastName.value;
        let correo = form.email.value;
        let usuario = form.username.value;
        let password = form.password.value;
        let usuarioDAO = new UsuarioDAO();
        let respuesta = await usuarioDAO.registrar(nombre,apellido,correo,usuario,password);
        if(respuesta.status){
            alert("Usuario Registrado");
        }else{
            alert(respuesta.message);
        }

    }

    return (
        <div className="login-container">
            <div className="button-group">
                <button onClick={handleToggle}>
                    {isRegister ? 'Registrar' : 'Iniciar Sesión' }
                </button>
            </div>
            {isRegister ? (
                <div className="register-form">
                    <h2>Formulario de Registro</h2>
                    {                <form onSubmit={(e)=>{handleLogin(e)}}>
                    <label>
                        Usuario:
                        <input type="text" name="username" required />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" name="password" required />
                    </label>
                    <button type="submit">Iniciar Sesión</button>
                </form>}

                </div>
            ) : (
                <div className="login-form">
                    <h2>Formulario de Inicio de Sesión</h2>
                    {
                              <form onSubmit={(e)=>{handleRegister(e)}}>
                              <label>
                                  Nombre:
                                  <input type="text" name="firstName" required />
                              </label>
                              <label>
                                  Apellido:
                                  <input type="text" name="lastName" required />
                              </label>
                              <label>
                                  Correo:
                                  <input type="email" name="email" required />
                              </label>
                              <label>
                                  Usuario:
                                  <input type="text" name="username" required />
                              </label>
                              <label>
                                  Contraseña:
                                  <input type="password" name="password" required />
                              </label>
                              <button type="submit">Registrar</button>
                          </form>
                    }
          
                </div>
            )}
        </div>
    );
};

export default Login;