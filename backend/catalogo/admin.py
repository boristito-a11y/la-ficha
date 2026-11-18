from django.contrib import admin
from django.utils.html import format_html
from .models import Categoria, Producto


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion")
    search_fields = ("nombre",)


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("miniatura", "nombre", "categoria", "precio", "stock")
    list_display_links = ("miniatura", "nombre")
    list_filter = ("categoria",)
    search_fields = ("nombre",)
    list_editable = ("precio", "stock")

    @admin.display(description="Foto")
    def miniatura(self, producto):
        if producto.imagen:
            return format_html(
                '<img src="{}" style="width:56px;height:42px;object-fit:cover;border-radius:6px">',
                producto.imagen.url,
            )
        return "—"