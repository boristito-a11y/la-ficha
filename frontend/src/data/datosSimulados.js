// Datos simulados (Ejercicio 03). Tienen la misma forma que la respuesta de Django.
export const categoriasSimuladas = [
  { id: 1, nombre: "Estrategia" },
  { id: 2, nombre: "Familiares" },
  { id: 3, nombre: "Cartas" },
  { id: 4, nombre: "Cooperativos" },
]

export const productosSimulados = [
  {
    id: 1,
    nombre: "Catan",
    descripcion: "Comercia, construye caminos y pueblos en una isla llena de recursos.",
    precio: "189.90",
    imagen: "https://placehold.co/600x450/1f4d3a/fdf6e3?text=Catan",
    stock: 12,
    categoria: 1,
    categoria_nombre: "Estrategia",
  },
  {
    id: 2,
    nombre: "Dixit",
    descripcion: "Cuenta historias con cartas ilustradas y adivina la carta de los demás.",
    precio: "149.50",
    imagen: "https://placehold.co/600x450/c2410c/fdf6e3?text=Dixit",
    stock: 10,
    categoria: 2,
    categoria_nombre: "Familiares",
  },
  {
    id: 3,
    nombre: "Uno",
    descripcion: "El clásico de cartas para quedarse sin mano lo antes posible.",
    precio: "29.90",
    imagen: "https://placehold.co/600x450/7c3aed/fdf6e3?text=Uno",
    stock: 40,
    categoria: 3,
    categoria_nombre: "Cartas",
  },
  {
    id: 4,
    nombre: "Pandemic",
    descripcion: "Trabajen en equipo para frenar cuatro enfermedades en el mundo.",
    precio: "199.00",
    imagen: "https://placehold.co/600x450/0e7490/fdf6e3?text=Pandemic",
    stock: 0,
    categoria: 4,
    categoria_nombre: "Cooperativos",
  },
]