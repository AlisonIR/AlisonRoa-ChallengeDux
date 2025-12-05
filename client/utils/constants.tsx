import type { DropdownOption, EstadoUsuario } from "./types";

// API Configuration
export const API_URL = "https://staging.duxsoftware.com.ar/api-test/personal";

// Business Constants
export const SECTOR = 7000;

// Pagination
export const DEFAULT_PAGE_LIMIT = 10;

// Validation Rules
export const USER_VALIDATION = {
	MIN_NAME_LENGTH: 3,
};

// Dropdown Options
export const ESTADO_OPTIONS: DropdownOption<EstadoUsuario | "">[] = [
	{ label: "Habilitado", value: "Habilitado" },
	{ label: "Deshabilitado", value: "Deshabilitado" },
];

// Colors
export const COLORS = {
	PRIMARY: "#0a58ca",
	DANGER: "#e63946",
};
