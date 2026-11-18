import Logo from "@/components/Logo"

const ENLACES = [
  { texto: "Catálogo", destino: "#catalogo" },
  { texto: "Categorías", destino: "#categorias" },
  { texto: "Ofertas", destino: "#catalogo" },
  { texto: "Contacto", destino: "#contacto" },
]

// Encabezado oscuro, del mismo color que el fondo del banner
function Header({ nombreTienda }) {
  return (
    <header className="absolute inset-x-0 top-0 z-20 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-8">
        <a href="#" className="flex items-center gap-3">
          <Logo className="size-10" />
          <span className="font-titulo text-2xl font-extrabold tracking-tight">{nombreTienda}</span>
        </a>

        <nav className="flex flex-wrap gap-1 text-sm">
          {ENLACES.map((enlace) => (
            <a
              key={enlace.texto}
              href={enlace.destino}
              className="rounded-full px-3 py-1.5 font-medium text-white/85 transition-colors hover:bg-white/15 hover:text-white"
            >
              {enlace.texto}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header