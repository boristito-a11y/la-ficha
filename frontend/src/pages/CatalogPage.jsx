import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Hero from "@/components/Hero"
import CategoryFilter from "@/components/CategoryFilter"
import ProductList from "@/components/ProductList"
import PromoBanner from "@/components/PromoBanner"
import SearchBar from "@/components/SearchBar"
import ProductDetail from "@/components/ProductDetail"
import { obtenerCategorias, obtenerProductos, obtenerPromociones } from "@/services/api"

function CatalogPage() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas")
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
    // Lab 14: búsqueda, ofertas, orden, promociones y detalle
  const [busqueda, setBusqueda] = useState("")
  const [soloOfertas, setSoloOfertas] = useState(false)
  const [orden, setOrden] = useState("nombre")
  const [promociones, setPromociones] = useState([])
  const [productoAbierto, setProductoAbierto] = useState(null)

  const cargarCatalogo = async () => {
    setCargando(true)
    setError("")
    try {
      // Las dos consultas se hacen al mismo tiempo
      const [listaProductos, listaCategorias, listaPromociones] = await Promise.all([
        obtenerProductos(),
        obtenerCategorias(),
        obtenerPromociones(),
      ])
      setProductos(listaProductos)
      setCategorias(listaCategorias)
      setPromociones(listaPromociones)
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

  // Se aplican en orden: categoría, búsqueda, ofertas y orden
  const texto = busqueda.trim().toLowerCase()
  const productosFiltrados = productos
    .filter((p) => categoriaSeleccionada === "todas" || p.categoria === categoriaSeleccionada)
    .filter((p) => p.nombre.toLowerCase().includes(texto))
    .filter((p) => !soloOfertas || p.descuento > 0)
    .sort((a, b) => {
      if (orden === "precio-asc") return a.precio_final - b.precio_final
      if (orden === "precio-desc") return b.precio_final - a.precio_final
      if (orden === "descuento") return b.descuento - a.descuento
      return a.nombre.localeCompare(b.nombre)
    })

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
            <PromoBanner promociones={promociones} />
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
              <div className="mb-6">
                <SearchBar
                  busqueda={busqueda}
                  onBuscar={setBusqueda}
                  soloOfertas={soloOfertas}
                  onSoloOfertas={setSoloOfertas}
                  orden={orden}
                  onOrden={setOrden}
                />
              </div>
              <ProductList productos={productosFiltrados} onVer={setProductoAbierto} />
            </section>
          </>
        )}
      </div>
            {productoAbierto && (
        <ProductDetail
          producto={productoAbierto}
          onCerrar={() => setProductoAbierto(null)}
          onVer={setProductoAbierto}
        />
      )}
    </main>
  )
}

export default CatalogPage