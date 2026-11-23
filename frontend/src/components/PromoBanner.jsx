// Franja de marketing con las promociones activas que se crean en el admin
function PromoBanner({ promociones }) {
  if (promociones.length === 0) return null

  return (
    <div className="mt-10 grid gap-3 md:grid-cols-2">
      {promociones.map((promo) => (
        <div
          key={promo.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-ambar to-orange-400 px-5 py-4 text-carbon"
        >
          <div>
            <p className="font-titulo text-lg leading-tight font-extrabold">{promo.titulo}</p>
            <p className="text-sm">{promo.descripcion}</p>
          </div>
          {promo.codigo && (
            <span className="rounded-lg border-2 border-dashed border-carbon/60 bg-white/60 px-3 py-1 font-mono text-sm font-bold">
              {promo.codigo}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default PromoBanner