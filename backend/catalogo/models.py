from decimal import Decimal

from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator
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
    imagen = models.ImageField(upload_to="productos/", blank=True)
    stock = models.PositiveIntegerField("cantidad disponible", default=0)
    # Relación uno a muchos: una categoría tiene muchos productos
    categoria = models.ForeignKey(
        Categoria, on_delete=models.PROTECT, related_name="productos"
    )
    # --- Lab 14: inventario y marketing ---
    stock_minimo = models.PositiveIntegerField("stock mínimo", default=3)
    descuento = models.PositiveSmallIntegerField(
        "descuento (%)", default=0, validators=[MaxValueValidator(90)]
    )
    destacado = models.BooleanField(default=False)

    class Meta:
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre

    @property
    def precio_final(self):
        """Precio con el descuento aplicado, redondeado a 2 decimales."""
        rebaja = self.precio * Decimal(self.descuento) / Decimal(100)
        return (self.precio - rebaja).quantize(Decimal("0.01"))

    @property
    def estado_stock(self):
        if self.stock == 0:
            return "agotado"
        if self.stock <= self.stock_minimo:
            return "bajo"
        return "ok"

class MovimientoInventario(models.Model):
    ENTRADA = "entrada"
    SALIDA = "salida"
    TIPOS = [(ENTRADA, "Entrada (reposición)"), (SALIDA, "Salida (venta o merma)")]

    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="movimientos")
    tipo = models.CharField(max_length=10, choices=TIPOS)
    cantidad = models.PositiveIntegerField()
    nota = models.CharField(max_length=150, blank=True)
    fecha = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-fecha"]
        verbose_name = "movimiento de inventario"
        verbose_name_plural = "movimientos de inventario"

    def __str__(self):
        return f"{self.get_tipo_display()} de {self.cantidad} · {self.producto}"

    def clean(self):
        # No se puede sacar más de lo que hay en el almacén
        if self.tipo == self.SALIDA and self.producto_id and self.cantidad > self.producto.stock:
            raise ValidationError(
                f"Solo hay {self.producto.stock} unidades de {self.producto}."
            )

    def save(self, *args, **kwargs):
        # Cada movimiento nuevo actualiza el stock del producto
        if self._state.adding:
            if self.tipo == self.ENTRADA:
                self.producto.stock += self.cantidad
            else:
                self.producto.stock -= self.cantidad
            self.producto.save(update_fields=["stock"])
        super().save(*args, **kwargs)

class Promocion(models.Model):
    titulo = models.CharField(max_length=80)
    descripcion = models.CharField(max_length=200)
    codigo = models.CharField("código de cupón", max_length=30, blank=True)
    activa = models.BooleanField(default=True)

    class Meta:
        verbose_name = "promoción"
        verbose_name_plural = "promociones"

    def __str__(self):
        return self.titulo