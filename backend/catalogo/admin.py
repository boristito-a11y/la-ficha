from django.contrib import admin, messages
from django.db.models import F
from django.utils.html import format_html

from .models import Categoria, MovimientoInventario, Producto, Promocion

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion")
    search_fields = ("nombre",)

class EstadoStockFilter(admin.SimpleListFilter):
    """Filtro lateral para ver rápido qué productos hay que reponer."""
    title = "estado del stock"
    parameter_name = "estado"

    def lookups(self, request, model_admin):
        return [("agotado", "Agotado"), ("bajo", "Stock bajo"), ("ok", "Disponible")]

    def queryset(self, request, queryset):
        if self.value() == "agotado":
            return queryset.filter(stock=0)
        if self.value() == "bajo":
            return queryset.filter(stock__gt=0, stock__lte=F("stock_minimo"))
        if self.value() == "ok":
            return queryset.filter(stock__gt=F("stock_minimo"))
        return queryset

class MovimientoInline(admin.TabularInline):
    model = MovimientoInventario
    extra = 0
    fields = ("fecha", "tipo", "cantidad", "nota")
    readonly_fields = ("fecha", "tipo", "cantidad", "nota")
    can_delete = False

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("miniatura", "nombre", "categoria", "precio", "descuento", "stock", "estado", "destacado")
    list_display_links = ("miniatura", "nombre")
    list_filter = (EstadoStockFilter, "categoria", "destacado")
    search_fields = ("nombre",)
    list_editable = ("precio", "descuento", "stock", "destacado")
    actions = ["reponer_10"]
    inlines = [MovimientoInline]

    @admin.display(description="Foto")
    def miniatura(self, producto):
        if producto.imagen:
            return format_html(
                '<img src="{}" style="width:56px;height:42px;object-fit:cover;border-radius:6px">',
                producto.imagen.url,
            )
        return "—"

    @admin.display(description="Estado")
    def estado(self, producto):
        colores = {"agotado": "#dc2626", "bajo": "#d97706", "ok": "#16a34a"}
        textos = {"agotado": "Agotado", "bajo": "Stock bajo", "ok": "Disponible"}
        return format_html(
            '<b style="color:{}">● {}</b>', colores[producto.estado_stock], textos[producto.estado_stock]
        )

    @admin.action(description="Reponer 10 unidades")
    def reponer_10(self, request, queryset):
        for producto in queryset:
            MovimientoInventario.objects.create(
                producto=producto, tipo=MovimientoInventario.ENTRADA, cantidad=10, nota="Reposición rápida"
            )
        self.message_user(request, f"Se repusieron {queryset.count()} producto(s).", messages.SUCCESS)

@admin.register(MovimientoInventario)
class MovimientoInventarioAdmin(admin.ModelAdmin):
    list_display = ("fecha", "producto", "tipo", "cantidad", "nota")
    list_filter = ("tipo", "producto__categoria")
    search_fields = ("producto__nombre",)

@admin.register(Promocion)
class PromocionAdmin(admin.ModelAdmin):
    list_display = ("titulo", "codigo", "activa")
    list_editable = ("activa",)