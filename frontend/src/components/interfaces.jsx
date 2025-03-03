import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import { fetchVideos } from "../api/authService";

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

const Video = ({ id, miniatura, duracion, title, author, vistas, tiempo, icon, video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${id}`, {
      state: { miniatura, duracion, title, author, vistas, tiempo, icon, video }
    });
  };
  
  return (
    <div className="video" onClick={handleClick}>
      <div className="miniatura-container">
        <a><img src={miniatura} className="miniatura" alt="Miniatura" /></a>
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
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchVideos();
        const baseURL = 'http://localhost'
        const formattedVideos = data.map(video => ({
          id: video.id,
          miniatura: baseURL + video.thumbnail.substring(10),
          duracion: video.duration,
          title: video.title,
          author: video.author,
          vistas: video.views,
          tiempo: video.tiempo,
          icon: baseURL + video.icon.substring(10),
          video: baseURL + video.video_file.substring(10)
        }));
        setVideos(formattedVideos);
      } catch (error) {
        console.error("Error loading videos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (loading) {
    return <div>Cargando videos...</div>;
  }

  return (
    <div className="lista-videos">
      {videos.map((video) => (
        <Video key={video.id} {...video} />
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
