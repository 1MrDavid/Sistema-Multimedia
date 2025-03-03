import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    
    return (
      <header>
        <div className="header-izquierdo">
          <img src="/images/menu.png" className="menu-icon" alt="Menu" />
          <img src="/images/logo.png" className="logo" alt="Logo" onClick={() => {navigate("/Interface");}} />
        </div>
        <div className="header-central">
          <input type="text" placeholder="Buscar" className="search-bar" />
          <div className="buscar-container">
            <img src="/images/buscar.png" alt="Buscar" />
            <div className="tooltip">Buscar</div>
          </div>
          <div className="mic-container">
            <img src="/images/microfono.png" className="mic-icon" alt="Micrófono" />
            <div className="tooltip">Realizar búsquedas por voz</div>
          </div>
        </div>
        <div className="header-derecho">
          <div className="subir-container">
            <img src="/images/subir-video.png" alt="Subir videos" />
            <div className="tooltip">Subir videos</div>
          </div>
          <div className="notificacion-container">
            <img src="/images/notificacion.png" alt="Notificaciones" />
            <div className="tooltip">Notificaciones</div>
          </div>
          <img src="/images/usuario.png" className="user-icon" alt="Usuario" />
        </div>
      </header>
    );
};

export default Header;