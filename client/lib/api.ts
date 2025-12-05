import axios from "axios";
import { API_URL, SECTOR } from "../utils/constants";
import { User, ApiUser, PagedResult, EstadoUsuario } from "../utils/types";

// Re-export types for backward compatibility
export type { User, PagedResult, EstadoUsuario };

export const getUsers = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  estado: EstadoUsuario | "" = ""
): Promise<PagedResult<User>> => {
  const params: any = {
    sector: SECTOR,
    _limit: limit,
    _page: page,
  };

  // Add search filter if provided (uses json-server's _like operator for partial matches)
  if (search.trim() !== "") {
    params.usuario_like = search;
  }

  // Transform frontend state format (Habilitado/Deshabilitado) to API format (ACTIVO/INACTIVO)
  if (estado === "Habilitado") params.estado = "ACTIVO";
  if (estado === "Deshabilitado") params.estado = "INACTIVO";

  const response = await axios.get<ApiUser[]>(API_URL, { params });

  // Get total count from json-server's custom header for pagination
  const total = Number(response.headers["x-total-count"]) || 0;

  // Transform API user format to frontend format
  const items: User[] = response.data.map((u) => ({
    id: u.id,
    nombre: u.usuario, // API uses 'usuario', frontend uses 'nombre'
    estado: u.estado === "ACTIVO" ? "Habilitado" : "Deshabilitado",
    sector: u.sector,
  }));

  // Sort by ID descending (newest first)
  items.sort((a, b) => Number(b.id) - Number(a.id));

  return { items, total };
};

export const createUser = async (user: User): Promise<User> => {
  // Transform frontend format to API format
  const payload = {
    usuario: user.nombre,
    estado: user.estado === "Habilitado" ? "ACTIVO" : "INACTIVO",
    sector: SECTOR,
  };

  const response = await axios.post<ApiUser>(API_URL, payload);

  // Transform API response back to frontend format
  return {
    id: response.data.id,
    nombre: response.data.usuario,
    estado: response.data.estado === "ACTIVO" ? "Habilitado" : "Deshabilitado",
    sector: response.data.sector,
  };
};

export const updateUser = async (
  id: number | string,
  user: User
): Promise<User> => {
  // Transform frontend format to API format
  const payload = {
    usuario: user.nombre,
    estado: user.estado === "Habilitado" ? "ACTIVO" : "INACTIVO",
    sector: SECTOR,
  };

  const response = await axios.put<ApiUser>(`${API_URL}/${id}`, payload);

  // Transform API response back to frontend format
  return {
    id: response.data.id,
    nombre: response.data.usuario,
    estado: response.data.estado === "ACTIVO" ? "Habilitado" : "Deshabilitado",
    sector: response.data.sector,
  };
};

export const deleteUser = async (id: number | string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};