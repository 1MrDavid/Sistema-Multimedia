import axios from 'axios';

const api = axios.create({
   baseURL: "/api",
   headers: {
     "Content-Type": "application/json",
   },
   withCredentials: true,  // Incluye cookies en las solicitudes
});

export const refreshToken = async () => {
    try {
      const response = await api.post("/token/refresh/");
      return response.data.access;  // Devuelve el nuevo token de acceso
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