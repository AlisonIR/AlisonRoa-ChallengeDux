import { useState, useEffect } from "react";
import { User, getUsers, PagedResult, EstadoUsuario } from "../lib/api";
import type { UseUserDataProps } from "../utils/types";

export function useUserData({
	initialUsers = [],
	initialTotalRecords = 0,
	page,
	limit,
	search,
	estadoFilter,
}: UseUserDataProps) {
	const [users, setUsers] = useState<User[]>(initialUsers);
	const [totalRecords, setTotalRecords] = useState<number>(initialTotalRecords);
	const [loading, setLoading] = useState(false);

	const loadUsers = async (
		p: number = page,
		s: string = search,
		e: EstadoUsuario | "" = estadoFilter
	) => {
		setLoading(true);
		try {
			const res: PagedResult<User> = await getUsers(p, limit, s, e);

			await new Promise((resolve) => setTimeout(resolve, 150));

			setUsers(res.items);
			setTotalRecords(res.total);
		} catch (err) {
			console.error("Error al cargar usuarios:", err);
		}
		setLoading(false);
	};

	useEffect(() => {
		loadUsers(page, search, estadoFilter);
	}, [page, search, estadoFilter]);

	return {
		users,
		totalRecords,
		loading,
		loadUsers,
	};
}
