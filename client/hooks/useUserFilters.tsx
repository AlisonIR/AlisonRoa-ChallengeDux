import { useState, useRef } from "react";
import { EstadoUsuario } from "../lib/api";
import type { UseUserFiltersProps } from "../utils/types";

export function useUserFilters({
	initialSearch = "",
	initialEstadoFilter = "",
	initialPage = 1,
}: UseUserFiltersProps = {}) {
	const [search, setSearch] = useState(initialSearch);
	const [estadoFilter, setEstadoFilter] = useState<EstadoUsuario | "">(initialEstadoFilter);
	const [page, setPage] = useState(initialPage);

	const searchRef = useRef<number | null>(null);

	const handleSearchChange = (value: string) => {
		setSearch(value);
		// Debounce search: wait 200ms after user stops typing before resetting page
		// This prevents unnecessary API calls while user is still typing
		if (searchRef.current) clearTimeout(searchRef.current);
		searchRef.current = window.setTimeout(() => setPage(1), 200);
	};

	const handleEstadoChange = (value: EstadoUsuario | "") => {
		setEstadoFilter(value);
		setPage(1);
	};

	return {
		search,
		estadoFilter,
		page,
		setPage,
		handleSearchChange,
		handleEstadoChange,
	};
}
