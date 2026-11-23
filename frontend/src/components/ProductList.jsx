import ProductCard from "@/components/ProductCard"

function ProductList({ productos, onVer }) {
  if (productos.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        No encontramos juegos con esos filtros.
      </p>
    )
  }

  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} onVer={onVer} />
      ))}
    </div>
  )
}

export default ProductList