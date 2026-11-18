import { Button } from "@/components/ui/button"

// Banner principal con una foto de fondo (public/hero.jpg)
function Hero({ totalProductos, totalCategorias }) {
  return (
    <section className="relative flex min-h-[460px] items-end overflow-hidden bg-carbon md:min-h-[540px]">
      <img
        src="/hero.jpg"
        alt="Mesa con juegos de mesa"
        className="absolute inset-0 size-full object-cover object-right"
      />
      {/* Degradado oscuro para que el texto se lea sobre la foto */}
      <div className="absolute inset-0 bg-gradient-to-r from-carbon/90 via-carbon/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-32 pb-14 text-white md:px-8">
        <p className="mb-3 text-sm font-semibold tracking-widest text-ambar uppercase">
          Tienda de juegos de mesa
        </p>
        <h1 className="max-w-2xl font-titulo text-4xl leading-[1.05] font-extrabold md:text-6xl">
          El juego perfecto para tu próxima noche de mesa
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/80">
          Estrategia, cartas, fiesta y juegos para toda la familia.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button asChild className="h-12 rounded-xl bg-ambar px-6 text-base font-bold text-carbon hover:bg-ambar/90">
            <a href="#catalogo">Ver catálogo</a>
          </Button>
          <p className="text-sm text-white/70">
            {totalProductos} juegos · {totalCategorias} categorías
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero