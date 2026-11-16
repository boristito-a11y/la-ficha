import Header from "@/components/Header"
import CatalogPage from "@/pages/CatalogPage"

function App() {
  return (
    <div className="min-h-screen">
      <Header nombreTienda="La Ficha" />
      <CatalogPage />
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        La Ficha · Tienda de juegos de mesa · Lima, Perú
      </footer>
    </div>
  )
}

export default App