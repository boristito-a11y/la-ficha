import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import CategoryFilter from "@/components/CategoryFilter"
import ProductList from "@/components/ProductList"
import { obtenerCategorias, obtenerProductos } from "@/services/api"

function CatalogPage() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas")
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  const cargarCatalogo = async () => {
    setCargando(true)
    setError("")
    try {
      // Las dos consultas se hacen al mismo tiempo
      const [listaProductos, listaCategorias] = await Promise.all([
        obtenerProductos(),
        obtenerCategorias(),
      ])
      setProductos(listaProductos)
      setCategorias(listaCategorias)
    } catch (err) {
      console.error(err)
      setError("No se pudo cargar el catálogo. Revisa que el servidor de Django esté encendido.")
    } finally {
      setCargando(false)
    }
  }

  // Se ejecuta una sola vez, cuando la página se muestra por primera vez
  useEffect(() => {
    cargarCatalogo()
  }, [])

  const productosFiltrados =
    categoriaSeleccionada === "todas"
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada)

  return (
    <main id="catalogo" className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <section className="mb-10 overflow-hidden rounded-3xl border-2 border-tinta bg-mostaza px-6 py-8 shadow-[8px_8px_0_#1C1A17] md:px-10">
        <p className="text-sm font-bold tracking-widest uppercase">Tienda de juegos de mesa</p>
        <h1 className="mt-2 max-w-2xl font-titulo text-4xl leading-none font-extrabold md:text-5xl">
          Encuentra el juego perfecto para tu próxima partida
        </h1>
      </section>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-titulo text-3xl font-extrabold">Catálogo</h2>
          {!cargando && !error && (
            <p className="text-sm text-muted-foreground">
              {productosFiltrados.length} producto(s) encontrados
            </p>
          )}
        </div>
        <CategoryFilter
          categorias={categorias}
          seleccionada={categoriaSeleccionada}
          onSeleccionar={setCategoriaSeleccionada}
        />
      </div>

      {cargando && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-80 animate-pulse rounded-xl bg-crema-oscuro" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border-2 border-dado bg-white p-6 text-center">
          <p className="font-semibold text-dado">{error}</p>
          <Button onClick={cargarCatalogo} className="mt-4">Reintentar</Button>
        </div>
      )}

      {!cargando && !error && <ProductList productos={productosFiltrados} />}
    </main>
  )
}

export default CatalogPage