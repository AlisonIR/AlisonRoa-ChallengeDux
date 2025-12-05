// User types
export type EstadoUsuario = "Habilitado" | "Deshabilitado";
export type EstadoApi = "ACTIVO" | "INACTIVO";

export interface User {
	id?: number | string;
	nombre: string;
	estado: EstadoUsuario;
	sector?: number;
}

export interface ApiUser {
	id: number | string;
	usuario: string;
	estado: EstadoApi;
	sector: number;
}

// Pagination types
export interface PagedResult<T> {
	items: T[];
	total: number;
}

// Dropdown option type
export interface DropdownOption<T = string> {
	label: string;
	value: T;
}

// Component Props Types
export interface UserTableProps {
	initialUsers?: User[];
	initialTotalRecords?: number;
	initialPage?: number;
	initialSearch?: string;
	initialEstadoFilter?: EstadoUsuario | "";
}

export interface UserTableFiltersProps {
	search: string;
	estadoFilter: EstadoUsuario | "";
	onSearchChange: (value: string) => void;
	onEstadoChange: (value: EstadoUsuario | "") => void;
}

export interface UserFormProps {
	user?: User;
	users: User[];
	onSubmit: (user: User) => void;
	onCancel: () => void;
}

export interface ButtonProps {
	label: string;
	onClick?: () => void;
	icon?: string;
	type?: "button" | "submit" | "reset";
	style?: React.CSSProperties;
	className?: string;
}

// Hook Props Types
export interface UseUserDataProps {
	initialUsers?: User[];
	initialTotalRecords?: number;
	page: number;
	limit: number;
	search: string;
	estadoFilter: EstadoUsuario | "";
}

export interface UseUserFiltersProps {
	initialSearch?: string;
	initialEstadoFilter?: EstadoUsuario | "";
	initialPage?: number;
}
