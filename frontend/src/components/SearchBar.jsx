// Búsqueda por nombre, filtro de ofertas y orden. Cada cambio avisa al padre.
function SearchBar({ busqueda, onBuscar, soloOfertas, onSoloOfertas, orden, onOrden }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-3 sm:flex-row sm:items-center">
      <input
        type="search"
        value={busqueda}
        onChange={(e) => onBuscar(e.target.value)}
        placeholder="🔍 Buscar juego por nombre…"
        className="h-11 flex-1 rounded-xl border border-border bg-arena px-4 text-sm outline-none focus:border-ambar focus:ring-2 focus:ring-ambar/30"
      />
      <label className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-border px-4 text-sm font-medium select-none">
        <input
          type="checkbox"
          checked={soloOfertas}
          onChange={(e) => onSoloOfertas(e.target.checked)}
          className="size-4 accent-ambar"
        />
        Solo ofertas
      </label>
      <select
        value={orden}
        onChange={(e) => onOrden(e.target.value)}
        className="h-11 rounded-xl border border-border bg-white px-3 text-sm"
      >
        <option value="nombre">Ordenar: nombre</option>
        <option value="precio-asc">Precio: menor a mayor</option>
        <option value="precio-desc">Precio: mayor a menor</option>
        <option value="descuento">Mayor descuento</option>
      </select>
    </div>
  )
}

export default SearchBar