import { Button } from "@/components/ui/button"

function CategoryFilter({ categorias, seleccionada, onSeleccionar }) {
  // "todas" es una opción extra que no viene de la base de datos
  const opciones = [{ id: "todas", nombre: "Todas" }, ...categorias]

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      {opciones.map((categoria) => {
        const activa = seleccionada === categoria.id
        return (
          <Button
            key={categoria.id}
            variant={activa ? "default" : "outline"}
            onClick={() => onSeleccionar(categoria.id)}
            className={`h-9 rounded-full border-2 px-4 font-semibold ${
              activa ? "border-mesa" : "border-tinta/15 bg-white hover:border-mesa hover:bg-white"
            }`}
          >
            {categoria.nombre}
          </Button>
        )
      })}
    </div>
  )
}

export default CategoryFilter