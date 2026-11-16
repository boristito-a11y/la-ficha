import ProductCard from "@/components/ProductCard"

function ProductList({ productos }) {
  if (productos.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-dashed border-border p-10 text-center text-muted-foreground">
        No hay productos en esta categoría.
      </p>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          nombre={producto.nombre}
          descripcion={producto.descripcion}
          precio={producto.precio}
          imagen={producto.imagen}
          categoria={producto.categoria_nombre}
          stock={producto.stock}
        />
      ))}
    </div>
  )
}

export default ProductList