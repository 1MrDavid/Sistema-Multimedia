import React from "react";
import Header from "./Header";
import { useLocation } from 'react-router-dom';

const Video = () => {
    const location = useLocation();
    const { miniatura, duracion, title, author, vistas, tiempo, icon, video } = location.state;

    return (
        <div className="container play-container">
        <div className="play-video"> 
            <video controls >
                <source src={video} type="video/mp4" />
            </video>
            <div className="etiquetas">
                <a href="#">#HTML</a> <a href="#">#CSS</a><a href="#">#JavaScript</a>
            </div>
            <h3>{ title }</h3>
            <div className="play-video-info">
                <div className="author">
                    <img src={ icon } />
                </div>
                <div className="">
                    <p>{ author }</p>
                    <span>200 suscriptores</span>
                </div>
                <button className="suscribirse-btn">Suscribirse</button>
            </div>
            <div>
                <a href="#"><img src="/images/like.png" />40</a>
                <a href="#"><img src="/images/dislike.png" />8</a>
                <a href="#"><img src="/images/compartir.png" />Compartir</a>
                <a href="#"><img src="/images/descargar.png" />Descargar</a>
            </div>
        </div>
            <div className="video-descripcion">
                <span>{ vistas } vistas &nbsp; hace { tiempo }</span>
                <p>Hola compañeros suscribanse a nuestro canal para mas contenido de programacion</p>
                <p>Muchas gracias por ver el video, dale like si te gusto y compartelo</p>
            </div>
            <h4>100 Comentarios</h4>
            <div className="agregar-comentario">
                <img src="/images/usuario.png" />
                <input type="text" placeholder="agregar un comentario..." />
            </div>
            <div className="comentario-reciente">
                <img src="/images/usuario.png" className="user-img" />
                <div>
                    <span className="user-name"> @leonid2309 &nbsp; Hace 4 dias</span>
                    <p>este video esta super bien me encanto </p>
                    <div className="reacciones">
                        <a href="#"> <img src="/images/like.png" /></a>
                        <span>20</span>
                        <a href="#"> <img src="/images/dislike.png" /></a>
                        <span>5</span>
                        <span>Responder</span>
                    </div>
                </div>
            </div>
            <div className="comentario-reciente">
                <img src="/images/usuario.png" className="user-img" />
                <div>
                    <span className="user-name"> @leonid2309 &nbsp; Hace 4 dias</span>
                    <p>Super informativo el video nuevo sub </p>
                    <div className="reacciones">
                        <a href="#"> <img src="/images/like.png" /></a>
                        <span>20</span>
                        <a href="#"> <img src="/images/dislike.png" /></a>
                        <span>5</span>
                        <span>Responder</span>
                    </div>
                </div>
            </div>
            <div className="comentario-reciente">
                <img src="/images/usuario.png" className="user-img" />
                <div>
                    <span className="user-name"> @leonid2309 &nbsp; Hace 4 dias</span>
                    <p>Saludos! me sirvio mucho tu video </p>
                    <div className="reacciones">
                        <a href="#"> <img src="/images/like.png" /></a>
                        <span>20</span>
                        <a href="#"> <img src="/images/dislike.png" /></a>
                        <span>5</span>
                        <span>Responder</span>
                    </div>
                </div>
            </div>
        <div className="sidebar-derecho"> 
            <div className="video-derecho">
              <a href="#" className="miniatura-pequena"><img src="/images/miniatura-1.png" alt="" /></a>
              <div className="video-info">
                <p className="title">Aprende a hacer un sistema multimedia similar a youtube</p>
                <p className="author">Grupo LLDM</p>
                <p>10 vistas &bull; hace 1 dia</p>
               </div>
            </div>
            <div className="video-derecho">
                <a href="#" className="miniatura-pequena"><img src="/images/miniatura-2.png" alt="" /></a>
                <div className="video-info">
                  <p className="title">Aprende a hacer un sistema multimedia similar a youtube</p>
                  <p className="author">Grupo LLDM</p>
                  <p>10 vistas &bull; hace 1 dia</p>
                 </div>
              </div>
              <div className="video-derecho">
                <a href="#" className="miniatura-pequena"><img src="/images/miniatura-3.png" alt="" /></a>
                <div className="video-info">
                  <p className="title">Aprende a hacer un sistema multimedia similar a youtube</p>
                  <p className="author">Grupo LLDM</p>
                  <p>10 vistas &bull; hace 1 dia</p>
                 </div>
              </div>
              <div className="video-derecho">
                <a href="#" className="miniatura-pequena"><img src="/images/miniatura-4.png" alt="" /></a>
                <div className="video-info">
                  <p className="title">Aprende a hacer un sistema multimedia similar a youtube</p>
                  <p className="author">Grupo LLDM</p>
                  <p>10 vistas &bull; hace 1 dia</p>
                 </div>
              </div>
              <div className="video-derecho">
                <a href="#" className="miniatura-pequena"><img src="/images/miniatura-5.png" alt="" /></a>
                <div className="video-info">
                  <p className="title">Aprende a hacer un sistema multimedia similar a youtube</p>
                  <p className="author">Grupo LLDM</p>
                  <p>10 vistas &bull; hace 1 dia</p>
                 </div>
              </div>
              <div className="video-derecho">
                <a href="#" className="miniatura-pequena"><img src="/images/miniatura-6.png" alt="" /></a>
                <div className="video-info">
                  <p className="title">Aprende a hacer un sistema multimedia similar a youtube</p>
                  <p className="author">Grupo LLDM</p>
                  <p>10 vistas &bull; hace 1 dia</p>
                 </div>
              </div>
              <div className="video-derecho">
                <a href="#" className="miniatura-pequena"><img src="/images/miniatura-7.png" alt="" /></a>
                <div className="video-info">
                  <p className="title">Aprende a hacer un sistema multimedia similar a youtube</p>
                  <p className="author">Grupo LLDM</p>
                  <p>10 vistas &bull; hace 1 dia</p>
                 </div>
              </div>
              <div className="video-derecho">
                <a href="#" className="miniatura-pequena"><img src="/images/miniatura-8.png" alt="" /></a>
                <div className="video-info">
                  <p className="title">Aprende a hacer un sistema multimedia similar a youtube</p>
                  <p className="author">Grupo LLDM</p>
                  <p>10 vistas &bull; hace 1 dia</p>
                 </div>
              </div>
              <div className="video-derecho">
                <a href="#" className="miniatura-pequena"><img src="/images/miniatura-9.png" alt="" /></a>
                <div className="video-info">
                  <p className="title">Aprende a hacer un sistema multimedia similar a youtube</p>
                  <p className="author">Grupo LLDM</p>
                  <p>10 vistas &bull; hace 1 dia</p>
                 </div>
              </div>
        </div>
    </div>

    )

}

const PlayVideo = () => {
    return (
      <div classNameName="container">
        <Header />
        <div classNameName="main-content">
          <Video />
        </div>
      </div>
    );
  };
  
  export default PlayVideo;
  