from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Categoria, Producto, Promocion
from .serializers import CategoriaSerializer, ProductoSerializer, PromocionSerializer

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductoSerializer

    def get_queryset(self):
        productos = Producto.objects.select_related("categoria")
        # Filtro opcional: /api/productos/?categoria=2
        categoria = self.request.query_params.get("categoria")
        if categoria:
            productos = productos.filter(categoria_id=categoria)
        return productos

    @action(detail=True)
    def recomendados(self, request, pk=None):
        """GET /api/productos/<id>/recomendados/ -> 4 productos parecidos."""
        producto = self.get_object()
        candidatos = Producto.objects.select_related("categoria").exclude(pk=producto.pk).filter(stock__gt=0)

        def puntaje(otro):
            puntos = 0
            if otro.categoria_id == producto.categoria_id:
                puntos += 50                      # misma categoría
            diferencia = abs(otro.precio_final - producto.precio_final)
            puntos += max(0, 30 - float(diferencia) / 5)  # precio parecido
            if otro.destacado:
                puntos += 10                      # productos destacados
            if otro.descuento:
                puntos += 5                       # en oferta
            return puntos

        mejores = sorted(candidatos, key=puntaje, reverse=True)[:4]
        return Response(self.get_serializer(mejores, many=True).data)

class PromocionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Promocion.objects.filter(activa=True)
    serializer_class = PromocionSerializer