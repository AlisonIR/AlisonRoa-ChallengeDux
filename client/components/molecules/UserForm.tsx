"use client";

import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import Button from "../atoms/Button";
import { User, EstadoUsuario } from "../../lib/api";
import { ESTADO_OPTIONS, SECTOR, COLORS } from "../../utils/constants";
import type { UserFormProps } from "../../utils/types";

export default function UserForm({
  user,
  users,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const [nombre, setNombre] = useState(user?.nombre || "");

  const [estado, setEstado] = useState<EstadoUsuario | "">(
    user?.estado || ""
  );

  const handleSubmit = () => {
    onSubmit({
      id: user?.id,
      nombre,
      estado: (estado || "Habilitado") as EstadoUsuario,
    });
  };

  return (
		<div className="p-4 px-2">
			<label className="font-semibold mb-2 block">ID</label>

			<InputText
				value={user?.id?.toString() || ""}
				disabled
				className="w-full mb-3 h-3rem bg-gray-100"
				placeholder="(Asignado automáticamente)"
				pt={{
					root: { className: "px-3" },
				}}
			/>

			<label className="font-semibold mb-2 block">Nombre</label>

			<InputText
				value={nombre}
				onChange={(e) => setNombre(e.target.value)}
				className="w-full mb-3 h-3rem"
				placeholder="Ingresar nombre del usuario"
				pt={{
					root: { className: "px-3" },
				}}
			/>

			<label className="font-semibold mb-2 block">Estado</label>

			<Dropdown
				options={ESTADO_OPTIONS}
				value={estado}
				onChange={(e) => setEstado(e.value)}
				className="w-full mb-3 h-3rem"
				placeholder="Seleccionar el estado"
				pt={{
					input: { className: "px-3" },
					trigger: { className: "pr-2" },
				}}
			/>

			<label className="font-semibold mb-2 block">Sector</label>

			<Dropdown
				value={SECTOR.toString()}
				disabled
				className="w-full mb-4 h-3rem"
				placeholder={SECTOR.toString()}
				pt={{
					input: { className: "px-3" },
					trigger: { className: "pr-2" },
				}}
			/>

			<div className="flex justify-content-center gap-3 mt-2">
				<Button
					label="Confirmar"
					className="p-button-primary cursor-pointer px-4 py-2 border-round-md font-semibold text-white border-none"
					style={{ backgroundColor: COLORS.PRIMARY }}
					onClick={handleSubmit}
				/>

				<Button
					label="Cancelar"
					className="p-button-outlined cursor-pointer px-4 py-2 border-round-md font-semibold bg-white"
					onClick={onCancel}
				/>
			</div>
		</div>
	);
}
