from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=60, unique=True)
    descripcion = models.CharField(max_length=200, blank=True)

    class Meta:
        ordering = ["nombre"]
        verbose_name = "categoría"
        verbose_name_plural = "categorías"

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=120)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    imagen = models.URLField(blank=True)
    stock = models.PositiveIntegerField("cantidad disponible", default=0)
    # Relación uno a muchos: una categoría tiene muchos productos
    categoria = models.ForeignKey(
        Categoria, on_delete=models.PROTECT, related_name="productos"
    )

    class Meta:
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre