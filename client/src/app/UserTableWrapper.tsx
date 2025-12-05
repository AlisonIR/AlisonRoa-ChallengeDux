import UserTable from "../../components/organisms/UserTable/UserDataTable";
import { User } from "../../lib/api";

export default function UserTableWrapper({
	initialUsers,
	initialTotalRecords,
	initialPage,
	initialSearch,
	initialEstadoFilter,
}: {
	initialUsers: User[];
	initialTotalRecords: number;
	initialPage: number;
	initialSearch: string;
	initialEstadoFilter: "" | "Habilitado" | "Deshabilitado";
}) {
	return (
		<UserTable
			initialUsers={initialUsers}
			initialTotalRecords={initialTotalRecords}
			initialPage={initialPage}
			initialSearch={initialSearch}
			initialEstadoFilter={initialEstadoFilter}
		/>
	);
}
