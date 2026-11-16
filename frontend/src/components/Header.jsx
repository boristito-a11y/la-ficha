import Logo from "@/components/Logo"

const ENLACES = ["Catálogo", "Novedades", "Ofertas", "Contacto"]

function Header({ nombreTienda }) {
  return (
    <header className="sticky top-0 z-20 border-b-4 border-mostaza bg-mesa text-crema">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-8">
        <a href="#" className="flex items-center gap-3">
          <Logo className="size-11 -rotate-6" />
          <div className="leading-tight">
            <p className="font-titulo text-2xl font-extrabold tracking-tight">{nombreTienda}</p>
            <p className="text-xs text-crema/70">Juegos de mesa para cada partida</p>
          </div>
        </a>

        <nav className="flex flex-wrap gap-1 text-sm">
          {ENLACES.map((enlace) => (
            <a
              key={enlace}
              href="#catalogo"
              className="rounded-full px-3 py-1.5 font-medium text-crema/85 transition-colors hover:bg-mesa-claro hover:text-crema"
            >
              {enlace}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header