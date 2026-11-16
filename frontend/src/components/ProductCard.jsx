import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

function ProductCard({ nombre, descripcion, precio, imagen, categoria, stock }) {
  const [imagenFallo, setImagenFallo] = useState(false)
  const agotado = stock === 0

  return (
    <Card className="group h-full gap-0 overflow-hidden border-2 border-tinta/10 py-0 transition-all hover:-translate-y-1 hover:border-tinta hover:shadow-[6px_6px_0_#1C1A17]">
      <div className="relative aspect-[4/3] overflow-hidden bg-crema-oscuro">
        {imagen && !imagenFallo ? (
          <img
            src={imagen}
            alt={nombre}
            loading="lazy"
            onError={() => setImagenFallo(true)}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center bg-mesa p-4 text-center font-titulo text-3xl font-extrabold text-crema">
            {nombre}
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-crema text-tinta">{categoria}</Badge>
        {agotado && (
          <span className="absolute inset-x-0 bottom-0 bg-dado py-1 text-center text-xs font-bold tracking-widest text-crema uppercase">
            Agotado
          </span>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 px-5 pt-4">
        <h3 className="font-titulo text-xl leading-tight font-bold">{nombre}</h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{descripcion}</p>
      </CardContent>

      <CardFooter className="mt-3 flex items-end justify-between border-t border-dashed border-border bg-transparent px-5 py-4">
        <p className="font-titulo text-2xl font-extrabold text-mesa">
          S/ {Number(precio).toFixed(2)}
        </p>
        <p className={`text-xs font-semibold ${agotado ? "text-dado" : "text-muted-foreground"}`}>
          {agotado ? "Sin stock" : `${stock} disponibles`}
        </p>
      </CardFooter>
    </Card>
  )
}

export default ProductCard