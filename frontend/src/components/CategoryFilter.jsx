// Muestra cada categoría como una tarjeta con foto. Al hacer clic avisa al padre.
function CategoryFilter({ categorias, seleccionada, onSeleccionar }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {categorias.map((categoria) => {
        const activa = seleccionada === categoria.id
        return (
          <button
            key={categoria.id}
            type="button"
            onClick={() => onSeleccionar(categoria.id)}
            className={`group relative h-28 overflow-hidden rounded-2xl bg-carbon text-left transition-all ${
              activa ? "ring-4 ring-ambar ring-offset-2" : "hover:-translate-y-0.5"
            }`}
          >
            {categoria.imagen && (
              <img
                src={categoria.imagen}
                alt=""
                className="absolute inset-0 size-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-110"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <span className="absolute bottom-3 left-3 text-white">
              <span className="block font-titulo text-lg leading-tight font-bold">{categoria.nombre}</span>
              <span className="text-xs text-white/75">
                {categoria.cantidad} {categoria.cantidad === 1 ? "juego" : "juegos"}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilter