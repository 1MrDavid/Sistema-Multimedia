# Usa imagen de Python como base
FROM python:3.11-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo que contiene las depedencias necesarias
COPY requirements.txt .

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el codigo del proyecto
COPY . .

# Expone el puerto para el servidor de desarrollo de Django
EXPOSE 8000

# Comando por defecto para iniciar el servidor
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]