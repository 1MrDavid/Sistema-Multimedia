import React from "react";
// import "./interfacestyles.css";

const Header = () => {
  return (
    <header>
      <div className="header-izquierdo">
        <img src="/images/menu.png" className="menu-icon" alt="Menu" />
        <img src="/images/logo.png" className="logo" alt="Logo" />
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

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="enlaces-nav">
        <a href="#"><img src="/images/home.png" alt="Home" /><p>Home</p></a>
        <a href="#"><img src="/images/suscripciones.png" alt="Suscripciones" /><p>Suscripciones</p></a>
        <a href="#"><img src="/images/ver-mas-tarde.png" alt="Ver más tarde" /><p>Ver más tarde</p></a>
        <a href="#"><img src="/images/playlist.png" alt="Playlist" /><p>Playlist</p></a>
        <a href="#"><img src="/images/like.png" alt="Me Gusta" /><p>Me Gusta</p></a>
        <a href="#"><img src="/images/descargar.png" alt="Descargar" /><p>Descargar</p></a>
        <hr />
      </div>
      <div className="canales-suscritos">
        <h3>SUSCRIPCIONES</h3>
        <a href="#"><img src="/images/canal-1.jpg" alt="Holy Hexor" /><p>Holy Hexor</p></a>
        <a href="#"><img src="/images/canal-2.jpg" alt="Tpabomah" /><p>Tpabomah</p></a>
        <a href="#"><img src="/images/canal-3.jpg" alt="Extended" /><p>Extended</p></a>
        <a href="#"><img src="/images/canal-4.jpg" alt="Anymal Live" /><p>Anymal Live</p></a>
        <a href="#"><img src="/images/canal-5.jpg" alt="Team Liquid" /><p>Team Liquid</p></a>
        <a href="#"><img src="/images/canal-6.jpg" alt="Gosu Gamers" /><p>Gosu Gamers</p></a>
        <a href="#"><img src="/images/canal-7.jpg" alt="Less Calm" /><p>Less Calm</p></a>
        <a href="#"><img src="/images/canal-8.jpg" alt="Fútbol y más" /><p>Fútbol y más</p></a>
      </div>
      <div className="main-content"></div>
      <div className="enlaces-ayuda">
        <a href="#">TODOS</a>
        <a href="#">CSS</a>
        <a href="#">JavaScript</a>
        <a href="#">React</a>
        <a href="#">NextJS</a>
        <a href="#">PYTHON</a>
        <a href="#">DESARROLLO WEB</a>
        <a href="#">c++</a>
        <a href="#">Desarrollo de Software</a>
        <a href="#">Java</a>
        <a href="#">MongoDB</a>
        <a href="#">NodeJS</a>
        <a href="#" className="oculto">Ingeniería de Software</a>
        <a href="#" className="oculto">UX/UI</a>
      </div>
    </div>
  );
};

const Video = ({ miniatura, duracion, title, author, vistas, tiempo, icon }) => {
  return (
    <div className="video">
      <div className="miniatura-container">
        <a href="play-video.html"><img src={miniatura} className="miniatura" alt="Miniatura" /></a>
        <div>{duracion}</div>
      </div>
      <div className="video-perfil">
        <img src={icon} alt="Usuario" />
        <div className="video-info">
          <p className="title">{title}</p>
          <p className="author">{author}</p>
          <p>{vistas} vistas &bull; hace {tiempo}</p>
        </div>
      </div>
    </div>
  );
};

const ListaVideos = () => {
  const videos = [
    { miniatura: "images/miniatura-1.png", duracion: "1:30", title: "Restauración de un Clásico", author: "Grupo LLDM", vistas: "20", tiempo: "5 minutos", icon: "/images/usuario.png" },
    { miniatura: "images/miniatura-2.png", duracion: "2:30", title: "A Toda Velocidad: Probando el Nuevo Deportivo", author: "Grupo LLDM", vistas: "10", tiempo: "1 día", icon: "/images/usuario.png" },
    { miniatura: "images/miniatura-3.png", duracion: "4:30", title: "Un Día Explorando la Ciudad", author: "Grupo LLDM", vistas: "15", tiempo: "1 semana", icon: "/images/usuario.png" },
    { miniatura: "images/miniatura-4.png", duracion: "6:30", title: "Aventuras al Aire Libre: Conectando con la Naturaleza", author: "Grupo LLDM", vistas: "10", tiempo: "1 día", icon: "/images/usuario.png" },
    { miniatura: "images/miniatura-5.png", duracion: "3:30", title: "Relajación Total: Un Día Perfecto en la Playa", author: "Grupo LLDM", vistas: "10", tiempo: "1 día", icon: "/images/usuario.png" },
    { miniatura: "images/miniatura-6.png", duracion: "8:30", title: "Historia y Arquitectura: Descubriendo los secretos de las mejores obras arquitectonicas", author: "Extended", vistas: "10", tiempo: "1 día", icon: "/images/canal-3.jpg" },
    { miniatura: "images/miniatura-7.png", duracion: "7:30", title: "Maravillas de la Naturaleza: Las Terrazas de Cultivo", author: "Anymal Live", vistas: "12", tiempo: "1 día", icon: "/images/canal-4.jpg" },
    { miniatura: "images/miniatura-8.png", duracion: "8:30", title: "Como tomar las mejores fotos en tu proximo viaje", author: "Extended", vistas: "5", tiempo: "1 año", icon: "/images/canal-3.jpg" },
    { miniatura: "images/miniatura-9.png", duracion: "1:30", title: "Lo nuevo en las IA de imagenes", author: "Tpabomah", vistas: "100", tiempo: "2 horas", icon: "/images/canal-2.jpg" },
  ];

  return (
    <div className="lista-videos">
      {videos.map((video, index) => (
        <Video key={index} {...video} />
      ))}
    </div>
  );
};

const Interface = () => {
  return (
    <div className="container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <ListaVideos />
      </div>
    </div>
  );
};

export default Interface;
