import { hc } from "hono/client";
// IMPORTANTE: Ajusta esta ruta relativa para que apunte al archivo principal de tu backend
// donde se hace el "export type ApiRoutes = typeof _apiRoutes;"
import type { ApiRoutes } from "../../../backend/src/app"; 

// Aquí pones la URL base de tu backend (cámbiala si tu backend corre en otro puerto)
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Creamos la instancia del cliente pasando el tipo exacto de tus rutas
export const api = hc<ApiRoutes>(BACKEND_URL);