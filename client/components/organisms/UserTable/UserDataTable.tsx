"use client";

import React, { useRef } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

import Button from "../../atoms/Button";
import UserForm from "../../molecules/UserForm";
import UserTableFilters from "./UserTableFilters";

import { useUserData } from "../../../hooks/useUserData";
import { useUserFilters } from "../../../hooks/useUserFilters";
import { useUserModal } from "../../../hooks/useUserModal";

import {
	User,
	createUser,
	updateUser,
	deleteUser,
} from "../../../lib/api";
import { SECTOR, DEFAULT_PAGE_LIMIT, USER_VALIDATION, COLORS } from "../../../utils/constants";
import type { UserTableProps } from "../../../utils/types";

const UserTable: React.FC<UserTableProps> = ({
	initialUsers = [],
	initialTotalRecords = 0,
	initialPage = 1,
	initialSearch = "",
	initialEstadoFilter = "",
}) => {
	const toast = useRef<Toast>(null);

	const {
		search,
		estadoFilter,
		page,
		setPage,
		handleSearchChange,
		handleEstadoChange,
	} = useUserFilters({
		initialSearch,
		initialEstadoFilter,
		initialPage,
	});

	const { users, totalRecords, loading, loadUsers } = useUserData({
		initialUsers,
		initialTotalRecords,
		page,
		limit: DEFAULT_PAGE_LIMIT,
		search,
		estadoFilter,
	});

	const { modalVisible, editingUser, openModal, closeModal } = useUserModal();

	const onPage = (event: any) => {
		const newPage = event.first / event.rows + 1;
		setPage(newPage);
	};

	const confirmDeleteUser = (user: User) => {
		confirmDialog({
			message: `¿Estás seguro que deseas eliminar a "${user.nombre}"?`,
			header: "Confirmar eliminación",
			icon: "pi pi-exclamation-triangle",
			acceptLabel: "Eliminar",
			rejectLabel: "Cancelar",
			acceptClassName: "p-button-danger",
			accept: async () => {
				await deleteUser(user.id!);

				toast.current?.show({
					severity: "success",
					summary: "Usuario eliminado",
					detail: "El usuario fue eliminado correctamente.",
					life: 2500,
				});

				// If we deleted the last item on a page > 1, go back to previous page
				// Otherwise, reload current page to show updated results
				const remaining = users.length - 1;
				const goBack = remaining === 0 && page > 1;

				if (goBack) setPage(page - 1);
				else loadUsers(page, search, estadoFilter);
			},
		});
	};

	const handleSubmit = async (user: User) => {
		// Normalize name: trim whitespace and convert to uppercase
		const nombreLimpio = user.nombre.trim().toUpperCase();

		// Validate minimum length
		if (!nombreLimpio || nombreLimpio.length < USER_VALIDATION.MIN_NAME_LENGTH) {
			toast.current?.show({
				severity: "warn",
				summary: "Nombre inválido",
				detail: `Debe tener al menos ${USER_VALIDATION.MIN_NAME_LENGTH} caracteres.`,
			});
			return;
		}

		// Check for duplicate names (excluding current user when editing)
		if (users.some((u) => u.nombre === nombreLimpio && u.id !== user.id)) {
			toast.current?.show({
				severity: "error",
				summary: "Duplicado",
				detail: `El usuario "${nombreLimpio}" ya existe.`,
			});
			return;
		}

		const submittedUser = { ...user, nombre: nombreLimpio };

		if (submittedUser.id) {
			await updateUser(submittedUser.id, submittedUser);

			toast.current?.show({
				severity: "success",
				summary: "Usuario actualizado",
				detail: "Los cambios fueron guardados correctamente.",
				life: 2500,
			});

			loadUsers(page, search, estadoFilter);
		} else {
			await createUser(submittedUser);

			toast.current?.show({
				severity: "success",
				summary: "Usuario creado",
				detail: "El usuario fue registrado correctamente.",
				life: 2500,
			});

			setPage(1);
		}

		closeModal();
	};

	return (
		<div>
			<Toast
				ref={toast}
				position="top-center"
				pt={{
					root: { style: { top: "80px" } },
					message: {
						className: "border-round-lg shadow-4 p-3",
						style: { boxShadow: "0 8px 20px rgba(15, 23, 42, 0.15)" },
					},
					text: { className: "text-center" },
					icon: { className: "hidden" },
				}}
			/>
			<ConfirmDialog
				pt={{
					footer: { className: "flex justify-content-end gap-3 p-3" },
					acceptButton: {
						className: "px-3 py-2 border-round-md font-semibold",
						style: { background: COLORS.DANGER, border: "none" },
					},
					rejectButton: {
						className: "px-3 py-2 font-semibold hover:surface-100",
					},
					icon: { className: "mr-3 flex-shrink-0 text-xl" },
				}}
			/>

			<div className="flex justify-content-between align-items-center mb-4">
				<h2 className="m-0">Usuarios</h2>

				<Button
					label="Nuevo Usuario"
					icon="pi pi-plus"
					className="p-button-primary border-round-md px-4 py-2 cursor-pointer font-semibold text-white border-none h-3rem"
					onClick={() =>
						window.dispatchEvent(new CustomEvent("open-new-user-modal"))
					}
					style={{
						background: COLORS.PRIMARY,
					}}
				/>
			</div>

			<UserTableFilters
				search={search}
				estadoFilter={estadoFilter}
				onSearchChange={handleSearchChange}
				onEstadoChange={handleEstadoChange}
			/>

			<DataTable
				value={users}
				dataKey="id"
				loading={loading}
				className={loading ? "opacity-60" : ""}
				paginator
				lazy
				first={(page - 1) * DEFAULT_PAGE_LIMIT}
				rows={DEFAULT_PAGE_LIMIT}
				totalRecords={totalRecords}
				onPage={onPage}
				paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
				currentPageReportTemplate=""
				paginatorClassName="flex justify-content-center"
				pt={{
					root: { className: "transition-opacity transition-duration-300" },
					loadingOverlay: {
						className: "surface-overlay opacity-70",
					},
					loadingIcon: {
						className: "text-5xl text-blue-600",
					},
					thead: { className: "surface-50" },
					headerRow: { className: "font-semibold text-600" },
					bodyRow: {
						className:
							"hover:surface-100 transition-colors transition-duration-150",
					},
				}}
			>
				<Column field="id" header="ID" sortable />

				<Column
					header="Usuario"
					sortable
					body={(rowData: User) => (
						<span
							className="cursor-pointer underline text-blue-600"
							onClick={() => openModal(rowData)}
						>
							{rowData.nombre}
						</span>
					)}
				/>

				<Column field="estado" header="Estado" sortable />
				<Column header="Sector" body={() => SECTOR} sortable />
				<Column
					header="Acciones"
					body={(rowData: User) => (
						<i
							className="pi pi-trash cursor-pointer text-xl"
							style={{ color: COLORS.DANGER }}
							onClick={() => confirmDeleteUser(rowData)}
						/>
					)}
					headerStyle={{ textAlign: "center" }}
					bodyStyle={{ textAlign: "center" }}
					alignHeader="center"
					align="center"
				/>
			</DataTable>

			<Dialog
				header={editingUser ? "Editar Usuario" : "Nuevo Usuario"}
				visible={modalVisible}
				onHide={closeModal}
				modal
				className="w-full"
				style={{ maxWidth: "40rem" }}
				pt={{
					header: {
						className: "p-3 text-white",
						style: { backgroundColor: COLORS.PRIMARY },
					},
					content: { className: "p-4" },
					footer: { className: "p-3 border-top-1 border-200" },
				}}
			>
				<UserForm
					user={editingUser}
					users={users}
					onSubmit={handleSubmit}
					onCancel={closeModal}
				/>
			</Dialog>
		</div>
	);
};

export default UserTable;
