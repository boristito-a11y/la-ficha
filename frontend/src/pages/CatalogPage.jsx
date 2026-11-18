import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Hero from "@/components/Hero"
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

  // Para cada categoría: cuántos productos tiene y la foto de uno de ellos
  const tarjetasCategorias = [
    { id: "todas", nombre: "Todas", cantidad: productos.length, imagen: productos[0]?.imagen },
    ...categorias.map((categoria) => {
      const suyos = productos.filter((p) => p.categoria === categoria.id)
      return { ...categoria, cantidad: suyos.length, imagen: suyos.find((p) => p.imagen)?.imagen }
    }),
  ]

  const productosFiltrados =
    categoriaSeleccionada === "todas"
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada)

  const nombreSeleccionada =
    tarjetasCategorias.find((c) => c.id === categoriaSeleccionada)?.nombre ?? "Todas"

  return (
    <main>
      <Hero totalProductos={productos.length} totalCategorias={categorias.length} />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {error && (
          <div className="mt-10 rounded-2xl border border-alerta/40 bg-white p-8 text-center">
            <p className="font-semibold text-alerta">{error}</p>
            <Button onClick={cargarCatalogo} className="mt-4">Reintentar</Button>
          </div>
        )}

        {cargando && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-[4/3] animate-pulse rounded-2xl bg-arena" />
            ))}
          </div>
        )}

        {!cargando && !error && (
          <>
            <section id="categorias" className="scroll-mt-6 pt-12">
              <h2 className="mb-5 font-titulo text-3xl font-extrabold">Explora por categoría</h2>
              <CategoryFilter
                categorias={tarjetasCategorias}
                seleccionada={categoriaSeleccionada}
                onSeleccionar={setCategoriaSeleccionada}
              />
            </section>

            <section id="catalogo" className="scroll-mt-6 py-12">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
                <h2 className="font-titulo text-3xl font-extrabold">
                  {categoriaSeleccionada === "todas" ? "Todo el catálogo" : nombreSeleccionada}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {productosFiltrados.length} producto(s) encontrados
                </p>
              </div>
              <ProductList productos={productosFiltrados} />
            </section>
          </>
        )}
      </div>
    </main>
  )
}

export default CatalogPage