import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { obtenerRecomendados } from "@/services/api"

// Ventana con el detalle del producto y el sistema de recomendación
function ProductDetail({ producto, onCerrar, onVer }) {
  const [recomendados, setRecomendados] = useState([])

  // Cada vez que se abre otro producto, pedimos sus recomendaciones a Django
  useEffect(() => {
    setRecomendados([])
    obtenerRecomendados(producto.id).then(setRecomendados).catch(console.error)
  }, [producto.id])

  return (
    <div
      onClick={onCerrar}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl sm:p-7"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <img src={producto.imagen} alt={producto.nombre} className="aspect-[4/3] w-full rounded-2xl object-cover" />
          <div>
            <p className="text-xs font-semibold tracking-wider text-ambar-oscuro uppercase">
              {producto.categoria_nombre}
            </p>
            <h2 className="mt-1 font-titulo text-3xl font-extrabold">{producto.nombre}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{producto.descripcion}</p>
            <p className="mt-5 text-2xl font-bold">
              S/ {Number(producto.precio_final).toFixed(2)}
              {producto.descuento > 0 && (
                <span className="ml-2 text-base font-normal text-muted-foreground line-through">
                  S/ {Number(producto.precio).toFixed(2)}
                </span>
              )}
            </p>
            {producto.descuento > 0 && (
              <p className="mt-1 text-sm font-semibold text-alerta">¡Ahorras {producto.descuento}%!</p>
            )}
            <p className="mt-2 text-sm">
              {producto.stock === 0 ? "Sin stock por ahora" : `${producto.stock} unidades disponibles`}
            </p>
            <Button onClick={onCerrar} variant="outline" className="mt-6">Cerrar</Button>
          </div>
        </div>

        <h3 className="mt-8 mb-4 font-titulo text-xl font-bold">También te puede gustar</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {recomendados.map((otro) => (
            <button key={otro.id} type="button" onClick={() => onVer(otro)} className="text-left">
              <img src={otro.imagen} alt={otro.nombre} className="aspect-[4/3] w-full rounded-xl object-cover" />
              <p className="mt-2 text-sm leading-tight font-semibold">{otro.nombre}</p>
              <p className="text-sm text-muted-foreground">S/ {Number(otro.precio_final).toFixed(2)}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail