// Todas las solicitudes HTTP al backend de Django pasan por este archivo
const API_URL = "http://localhost:8000/api"

async function pedir(ruta) {
  const respuesta = await fetch(`${API_URL}${ruta}`)
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al consultar ${ruta}`)
  }
  return respuesta.json()
}

export function obtenerProductos() {
  return pedir("/productos/")
}

export function obtenerCategorias() {
  return pedir("/categorias/")
}

export function obtenerPromociones() {
  return pedir("/promociones/")
}

export function obtenerRecomendados(idProducto) {
  return pedir(`/productos/${idProducto}/recomendados/`)
}