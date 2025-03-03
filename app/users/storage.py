from django.core.files.storage import FileSystemStorage

class CleanFileNameStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        # Elimina cualquier archivo existente con el mismo nombre
        if self.exists(name):
            self.delete(name)
        return name