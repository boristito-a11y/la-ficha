import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

function ProductCard({ nombre, descripcion, precio, imagen, categoria, stock }) {
  const [imagenFallo, setImagenFallo] = useState(false)
  const agotado = stock === 0
  const ultimas = stock > 0 && stock <= 3

  return (
    <Card className="group h-full gap-0 overflow-hidden rounded-2xl border-0 bg-transparent py-0 shadow-none ring-0">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-arena">
        {imagen && !imagenFallo ? (
          <img
            src={imagen}
            alt={nombre}
            loading="lazy"
            onError={() => setImagenFallo(true)}
            className={`size-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              agotado ? "grayscale" : ""
            }`}
          />
        ) : (
          <div className="grid size-full place-items-center text-sm text-muted-foreground">
            Sin foto
          </div>
        )}
        {agotado && <Badge className="absolute top-3 left-3 bg-carbon text-white">Agotado</Badge>}
        {ultimas && (
          <Badge className="absolute top-3 left-3 bg-ambar text-carbon">¡Últimas {stock}!</Badge>
        )}
      </div>

      <CardContent className="px-1 pt-4">
        <p className="text-xs font-semibold tracking-wider text-ambar-oscuro uppercase">{categoria}</p>
        <h3 className="mt-1 font-titulo text-xl leading-tight font-bold">{nombre}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{descripcion}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold">S/ {Number(precio).toFixed(2)}</p>
          <p className={`text-xs font-medium ${agotado ? "text-alerta" : "text-green-700"}`}>
            {agotado ? "Sin stock" : `● ${stock} disponibles`}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard