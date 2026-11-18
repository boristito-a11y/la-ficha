import Header from "@/components/Header"
import Logo from "@/components/Logo"
import CatalogPage from "@/pages/CatalogPage"

function App() {
  return (
    <div className="relative min-h-screen">
      <Header nombreTienda="La Ficha" />
      <CatalogPage />
      <footer id="contacto" className="bg-carbon text-white/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-10 text-sm md:px-8">
          <div className="flex items-center gap-3 text-white">
            <Logo className="size-8" />
            <span className="font-titulo text-lg font-bold">La Ficha</span>
          </div>
          <p>Av. Larco 123, Miraflores · Lima, Perú</p>
          <p>© 2026 La Ficha · Tienda de juegos de mesa</p>
        </div>
      </footer>
    </div>
  )
}

export default App