"use client";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { ESTADO_OPTIONS } from "../../../utils/constants";
import type { UserTableFiltersProps } from "../../../utils/types";

export default function UserTableFilters({
	search,
	estadoFilter,
	onSearchChange,
	onEstadoChange,
}: UserTableFiltersProps) {
	return (
		<div className="flex gap-3 mb-4 flex-wrap">
			<InputText
				placeholder="Buscar"
				value={search}
				onChange={(e) => onSearchChange(e.target.value)}
				className="flex-1 border-round-md h-3rem"
				style={{ minWidth: "280px" }}
				pt={{
					root: { className: "px-3" },
				}}
			/>

			<Dropdown
				value={estadoFilter}
				options={ESTADO_OPTIONS}
				placeholder="Seleccionar estado"
				onChange={(e) => onEstadoChange(e.value)}
				className="flex-1 cursor-pointer border-round-md h-3rem"
				style={{ minWidth: "280px" }}
				pt={{
					input: { className: "px-3" },
					trigger: { className: "pr-2" },
					panel: { className: "mt-1" },
					list: { className: "py-2" },
					item: {
						className:
							"px-4 py-3 mx-2 my-1 border-round text-base transition-all transition-duration-200 hover:surface-100",
					},
				}}
			/>

			<Dropdown
				placeholder="Seleccionar Sector"
				disabled
				className="flex-1 border-round-md h-3rem"
				style={{ minWidth: "280px" }}
				pt={{
					input: { className: "px-3" },
					trigger: { className: "pr-2" },
				}}
			/>
		</div>
	);
}
