from django.core.management.base import BaseCommand
from users.models import CustomUser, Video
from django.core.files import File
import os
from django.conf import settings

class Command(BaseCommand):
    help = 'Carga datos iniciales de videos con URLs en /api/media/'

    def handle(self, *args, **options):
        user, _ = CustomUser.objects.get_or_create(
            username='admin',
            defaults={'email': 'admin@example.com', 'is_staff': True}
        )

        # Corregido: 4 paréntesis de cierre
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
        MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

        videos_data = [
            {
                'title': 'Restauración de un Clásico',
                'author': 'Grupo LLDM',
                'views': 20,
                'duration': '1:30',
                'thumbnail': 'thumbnails/miniatura-1.png',
                'icon': 'icons/usuario.png',
                'video_file': 'video1.mp4'
            },
            {
                'title': 'A Toda Velocidad: Probando el Nuevo Deportivo',
                'author': 'Grupo LLDM',
                'views': 10,
                'duration': '2:30',
                'thumbnail': 'thumbnails/miniatura-2.png',
                'icon': 'icons/usuario.png',
                'video_file': 'video2.mp4'
            },
            {
                'title': 'Un Día Explorando la Ciudad',
                'author': 'Grupo LLDM',
                'views': 15,
                'duration': '4:30',
                'thumbnail': 'thumbnails/miniatura-3.png',
                'icon': 'icons/usuario.png',
                'video_file': 'video3.mp4'
            },
            {
                'title': 'Aventuras al Aire Libre: Conectando con la Naturaleza',
                'author': 'Grupo LLDM',
                'views': 10,
                'duration': '6:30',
                'thumbnail': 'thumbnails/miniatura-4.png',
                'icon': 'icons/usuario.png',
                'video_file': 'video4.mp4'
            },
            {
                'title': 'Relajación Total: Un Día Perfecto en la Playa',
                'author': 'Grupo LLDM',
                'views': 10,
                'duration': '3:30',
                'thumbnail': 'thumbnails/miniatura-5.png',
                'icon': 'icons/usuario.png',
                'video_file': 'video5.mp4'
            },
            {
                'title': 'Historia y Arquitectura: Descubriendo los secretos...',
                'author': 'Extended',
                'views': 10,
                'duration': '8:30',
                'thumbnail': 'thumbnails/miniatura-6.png',
                'icon': 'icons/canal-3.jpg',
                'video_file': 'video6.mp4'
            },
            {
                'title': 'Maravillas de la Naturaleza: Las Terrazas de Cultivo',
                'author': 'Anymal Live',
                'views': 12,
                'duration': '7:30',
                'thumbnail': 'thumbnails/miniatura-7.png',
                'icon': 'icons/canal-4.jpg',
                'video_file': 'video7.mp4'
            },
            {
                'title': 'Como tomar las mejores fotos en tu proximo viaje',
                'author': 'Extended',
                'views': 5,
                'duration': '8:30',
                'thumbnail': 'thumbnails/miniatura-8.png',
                'icon': 'icons/canal-3.jpg',
                'video_file': 'video8.mp4'
            },
            {
                'title': 'Lo nuevo en las IA de imagenes',
                'author': 'Tpabomah',
                'views': 100,
                'duration': '1:30',
                'thumbnail': 'thumbnails/miniatura-9.png',
                'icon': 'icons/canal-2.jpg',
                'video_file': 'video9.mp4'
            }
        ]

        for video_info in videos_data:
            try:
                video = Video(
                    title=video_info['title'],
                    author=video_info['author'],
                    views=video_info['views'],
                    duration=video_info['duration'],
                    channel=user
                )

                # Guardar archivos sin modificar nombres
                with open(os.path.join(settings.MEDIA_ROOT, video_info['thumbnail']), 'rb') as f:
                    video.thumbnail.save(
                        os.path.basename(video_info['thumbnail']),
                        File(f),
                        save=False
                    )

                with open(os.path.join(settings.MEDIA_ROOT, video_info['icon']), 'rb') as f:
                    video.icon.save(
                        os.path.basename(video_info['icon']),
                        File(f),
                        save=False
                    )

                with open(os.path.join(settings.MEDIA_ROOT, video_info['video_file']), 'rb') as f:
                    video.video_file.save(
                        os.path.basename(video_info['video_file']),
                        File(f),
                        save=False
                    )

                video.save()
                
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error: {str(e)}'))

        self.stdout.write(self.style.SUCCESS('¡Datos cargados con URLs /api/media/!'))