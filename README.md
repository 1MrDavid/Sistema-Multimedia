## ***Descripción***
Este es un proyecto realizado como tarea de una materia de la universidad. Se trata de una interfaz estilo youtube que maneja creación y validación de usuarios usando Json Web Tokens, manejo de componentes mediante React, manejo de imágenes y videos mediante Django y uso de contenedores con Docker.

---
### ***Herramientas utilizadas***
- React
- Django
- Git
- Docker
- JWT
---
## ***Pasos para ejecutar el proyecto con Docker***
1. Descargar los archivos del proyecto
2. Instalar o abrir Docker Desktop
3. Ir a la ruta del proyecto y ejecutar el siguiente comando para construir el contenedor
```PowerShell
docker-compose build
```
4. Ejecutar el siguiente comando para iniciar el contenedor
```
docker-compose start -d
```
---
## _Interfaces_
1. ***Registro de usuario***
   ![Registro de usuario](./images/Pasted%20image%2020250224215531.png)
2. ***Inicio de sesión***
   ![Inicio de sesión](./images/Pasted%20image%2020250224215325.png)
3. ***Interfaz principal***
   ![Interfaz principal](./images/Pasted%20image%2020250224215739.png)
4. ***Interfaz de video***
   ![Interfaz de video](./images/Pasted%20image%2020250309204652.png)
---
## ***Flujo de peticiones para el backend***
El backend en Django responde a peticiones http que se realizan a los rutas asignadas:
```PYTHON
from django.contrib import admin
from django.urls import path, include
from .views import CreateUserView, CustomTokenObtainPairView, CustomTokenRefreshView, ProtectedView, VideoListAPIView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("user/register/", CreateUserView.as_view(), name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="refresh"),
    path("protected/", ProtectedView.as_view(), name="protected_view"),
    path('videos/', VideoListAPIView.as_view(), name='video-list'),
    path("api-auth/", include("rest_framework.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
Por ejemplo, para registro de usuario se envía una petición a `http://localhost:8000/api/user/register/`
Por otro lado, en React se envía las peticiones a Django usando Axios
```JAVASCRIPT
import axios from 'axios';

const api = axios.create({
   baseURL: "/api",
   headers: {
     "Content-Type": "application/json",
   },
   withCredentials: true,  // Incluye cookies en las solicitudes
});

export const refreshToken = async () => {
    try {
      const response = await api.post("/token/refresh/");
      return response.data.access;  // Devuelve el nuevo token de acceso
    } catch (error) {
      throw error.response.data;
    }
  };

export const fetchProtectedData = async () => {
	try {
      const response = await api.get("/protected/");
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        try {
          const newAccessToken = await refreshToken();
          document.cookie = `access_token=${newAccessToken}; path=/; Secure; HttpOnly`;
          const response = await api.get("/protected/");
          return response.data;
        } catch (refreshError) {
          window.location.href = "/login";
          return;
        }
      }
      throw error.response.data;
    }
  };


export const registerUser = async (userData) => {
    try {
        const response = await api.post("/user/register/", userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post("/token/", userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchVideos = async () => {
  try {
    const response = await api.get("/videos/");
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      try {
        const newAccessToken = await refreshToken();
        document.cookie = `access_token=${newAccessToken}; path=/; Secure; HttpOnly`;
        const response = await api.get("/videos/");
        return response.data;
      } catch (refreshError) {
        window.location.href = "/login";
        return;
      }
    }
    throw error.response.data;
  }
};
```
Cabe destacar que, la dirección base es `http://localhost:8000/api`. Eso debido a la configuración realizada en `/app/backend/urls`
```PYTHON
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
]
```
Así mismo, se usa localhost y el puerto por defecto al tratarse de un desarrollo de un proyecto que no va a ser desplegado en entornos de producción, por eso no se realizan configuraciones adicionales para direcciones, seguridad con respecto a ellos o IP.

---
## ***Modelos Django***
Los modelos en Django representan una tabla que se va a usar en la base de datos. Por defecto se utiliza SQLite, que es el que se aplica en el proyecto.
1. ***Usuario:*** Usa como base el modelo de AbstractUser que tiene Django por defecto y adicionalmente se agrega un campo para que se pueda asignar una imagen de perfil. Además, se permiten valores null y blank.
```PYTHON
class CustomUser(AbstractUser):
    profile_image = models.ImageField(
        upload_to='profile_images/',
        null=True,
        blank=True
    )
    
    class Meta:
        db_table = 'auth_user'
```
2. ***Video:*** Tabla para guardar los videos que se van a usar en la aplicación. Incluye titulo, autor, vistas, duración, fecha de subida, miniatura, archivo de video, icono, categoría y canal .  Para las imágenes y los videos se guarda directamente en local y se acceden a ellas directamente como se ve en el código. Para guardar estos archivos en el proyecto se asignó persistencias en el Dockerfile que guarda todo lo relacionado.
```PYTHON
class Video(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    views = models.PositiveIntegerField(default=0)
    duration = models.CharField(max_length=10)
    upload_date = models.DateTimeField(auto_now_add=True)
    thumbnail = models.ImageField(
        upload_to='thumbnails/',
        storage=CleanFileNameStorage()  
    )
    video_file = models.FileField(
        upload_to='videos/',
        storage=CleanFileNameStorage() 
    )
    icon = models.ImageField(
        upload_to='icons/',
        storage=CleanFileNameStorage()  
    )
    categories = models.CharField(max_length=100, blank=True)
    channel = models.ForeignKey('CustomUser', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
```
---
## ***Flujo para creación de usuario***
La creación de usuario se realiza enviando una petición a Django con los datos con los que se van a crear el usuario
![Creación de usuario](./images/Pasted%2520image%252020250309210835.png)
- Tipo de petición: POST
- Datos de entrada: { username, password }
```
{
  "username": "pepe",
  "password": "1234"
}
```
- Datos de salida: { id del usuario, username }
```
{
  "id": 3,
  "username": "pepe"
}
```
La petición se envía a `http://localhost:8000/api/user/register/`
```JAVASCRIPT
export const registerUser = async (userData) => {
    try {
        const response = await api.post("/user/register/", userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
```
Luego de realizar la petición Django procede a crear el usuario.
```PYTHON
class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
```
---
## ***Flujo de inicio de sesión***
El inicio de sesión se realiza enviando una petición a Django con los datos de un usuario existente. Una vez Django valida que el usuario existe procede a responder con los tokens que se van a usar para acceder al contenido y un token de refresco que genera un nuevo token de acceso.
![Inicio de sesión](./images/Pasted%2520image%252020250309213713.png)
- Tipo de petición: POST
- Datos de entrada: { username, password }
```
{
  "username": "pepe",
  "password": "1234"
}
```
- Datos de salida: { refresh_token, access_token }
```
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MjE3NTE1NiwiaWF0IjoxNzQxNTcwMzU2LCJqdGkiOiJhMGZiODQzNmMwMjI0MjBmODkwYzI5MDcwNjE2YjhiMyIsInVzZXJfaWQiOjF9.0iwOMOslymnIuaQlr_4ZMvz0eYRJi_rV6GK8usFAyM4",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQxNTcxMjU2LCJpYXQiOjE3NDE1NzAzNTYsImp0aSI6IjdiY2VkMmUzN2Q2NTQxNmQ5Y2M1MGZlZjIxN2ZjMzkzIiwidXNlcl9pZCI6MX0.baj-snz9qnnmw0sDOL572cHQ8TrrQJRL_IHFowGXn1U"
}
```
La petición se envía a `http://localhost:8000/api/token/`
```JAVASCRIPT
export const loginUser = async (userData) => {
    try {
        const response = await api.post("/token/", userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
```
Luego Django se encarga de validar el usuario y generar los tokens correspondientes
```PYTHON
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        # Llama la implementación original para obtener los tokens
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            #Guarda el token de acceso en una cookie
            access_token = response.data["access"]
            refresh_token = response.data["refresh"]

            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                samesite='None',
                secure=True,
                max_age=3600,
            )

            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                samesite='None',
                secure=True,
                max_age=86400,
            )
        return response
```
Los tokens no se envían directamente al JavaScript, sino que son guardados en unas cookies las cuales son enviadas en las peticiones que se realizan con Axios desde React
```JAVASCRIPT
const api = axios.create({
   baseURL: "/api",
   headers: {
     "Content-Type": "application/json",
   },
   withCredentials: true,  // Incluye cookies en las solicitudes
});
```
---
## ***Flujo para refrescar tokens***
Los tokens de acceso tienen una duración de 15 minutos y los tokens de refresco tienen una duración de 7 días. Esto parametrizable en el archivo settings.py en Django.
```PYTHON
# Configuracion de tokens
SIMPLE_JWT = {

    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),  # Token de acceso expira en 15 min
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),  # Token de refresco expira en 7 días
}
```
Después de los 15 minutos el token deja de ser valido para el usuario. Allí es donde se usa el token de refresco, pues con este se genera un nuevo token de acceso sin necesidad de volver a iniciar sesión. Cabe destacar que, cada vez que se inicia sesión se genera nuevos tokens de acceso y refresco.
![Refresco de tokens](./images/Pasted%2520image%252020250309231715.png)
- Tipo de petición: POST
- Datos de entrada: {refresh token}
```
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MjE3NTE1NiwiaWF0IjoxNzQxNTcwMzU2LCJqdGkiOiJhMGZiODQzNmMwMjI0MjBmODkwYzI5MDcwNjE2YjhiMyIsInVzZXJfaWQiOjF9.0iwOMOslymnIuaQlr_4ZMvz0eYRJi_rV6GK8usFAyM4"
}
```
- Datos de salida: {access token}
```
{
"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQxNTcxMjU2LCJpYXQiOjE3NDE1NzAzNTYsImp0aSI6IjdiY2VkMmUzN2Q2NTQxNmQ5Y2M1MGZlZjIxN2ZjMzkzIiwidXNlcl9pZCI6MX0.baj-snz9qnnmw0sDOL572cHQ8TrrQJRL_IHFowGXn1U"
}
```
Se envía la petición a `http://localhost:8000/api/token/refresh/` si alguna de las peticiones que requiere token de acceso da error
```JAVASCRIPT
    } catch (error) {
      if (error.response.status === 401) {
        try {
          const newAccessToken = await refreshToken();
          document.cookie = `access_token=${newAccessToken}; path=/; Secure; HttpOnly`;
          const response = await api.get("/protected/");
          return response.data;
        } catch (refreshError) {
          window.location.href = "/login";
          return;
        }
      }
      throw error.response.data;
    }
  };
```
Luego Django se encarga de validar y responder con el nuevo token
```PYTHON
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            logger.error("Refresh token no proporcionado en las cookies")  # Log de error
            return Response({"error": "Refresh token no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

        # Agrega el refresh_token al cuerpo de la solicitud
        request.data["refresh"] = refresh_token

        # Llama a la implementación original para refrescar el token
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            logger.info(f"Token refrescado exitosamente para el usuario")  # Log de éxito
        else:
            logger.error(f"Error al refrescar el token: {response.data}")  # Log de error

        return response
```
---
## ***Validación de usuario para acceder a la interfaz***
Para acceder tanto a la interfaz principal como a alguno de los videos se requiere validar el token de acceso para permitir el ingreso.
![Validación de usuario](./images/Pasted%2520image%252020250309232845.png)
Para ello, en las rutas en React se ejecuta el componente que valida token antes de proseguir
```JAVASCRIPT
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/Interface"
          element={<ProtectedRoute element={Dashboard} />} // ProtectedRoute valida token antes de avanzar
        />
        <Route
          path="/video/:id"
          element={<ProtectedRoute element={PlayVideo} />} // ProtectedRoute valida token antes de avanzar
        />
      </Routes>
    </Router>
  );
}
```
Entonces, Django se encarga de validar el token 
```PYTHON
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logger.info(f"Usuario autenticado en la vista: {request.user.username}")
        return Response({"message": "Esta es una vista protegida", "user": request.user.username})
```
---
## ***Flujo para envío de Videos***
Los videos y las imágenes se guardan en una carpeta en Django, estos pueden ser accedidos mediante rutas al igual que las otras peticiones
```PYTHON
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
La ruta es así: ``http://localhost:8000/api/images/<archivo>`
Y toda la información que se requiere para mostrar la lista de videos en la interfaz principal la proporciona el back con una petición GET a la ruta `http://localhost:8000/api/videos/`
```JAVASCRIPT
export const fetchVideos = async () => {
  try {
    const response = await api.get("/videos/");
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      try {
        const newAccessToken = await refreshToken();
        document.cookie = `access_token=${newAccessToken}; path=/; Secure; HttpOnly`;
        const response = await api.get("/videos/");
        return response.data;
      } catch (refreshError) {
        window.location.href = "/login";
        return;
      }
    }
    throw error.response.data;
  }
};
```
Django se encarga de enviar los datos que posee en la base de datos, eso incluye las rutas de las imágenes y los videos antes mencionados
```PYTHON
class VideoListAPIView(generics.ListAPIView):
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Video.objects.select_related('channel').all()
```
El componente de la interfaz en React se encarga de tomar la lista que devuelve Django y lo renderiza
```JAVASCRIPT
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
```