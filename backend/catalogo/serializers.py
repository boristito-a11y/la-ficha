from rest_framework import serializers
from .models import Categoria, Producto, Promocion


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ["id", "nombre", "descripcion"]


class ProductoSerializer(serializers.ModelSerializer):
    # Además del id, enviamos el nombre de la categoría para mostrarlo en React
    categoria_nombre = serializers.CharField(source="categoria.nombre", read_only=True)
    precio_final = serializers.DecimalField(max_digits=8, decimal_places=2, read_only=True)
    estado_stock = serializers.CharField(read_only=True)

    class Meta:
        model = Producto
        fields = [
            "id", "nombre", "descripcion", "precio", "descuento", "precio_final",
            "imagen", "stock", "estado_stock", "destacado",
            "categoria", "categoria_nombre",
        ]


class PromocionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promocion
        fields = ["id", "titulo", "descripcion", "codigo"]