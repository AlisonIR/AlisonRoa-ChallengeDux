import { useState, useEffect } from "react";
import { User } from "../lib/api";

export function useUserModal() {
	const [modalVisible, setModalVisible] = useState(false);
	const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

	const openModal = (user?: User) => {
		setEditingUser(user);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
		setEditingUser(undefined);
	};

	useEffect(() => {
		const handleOpenModal = () => openModal(undefined);
		window.addEventListener("open-new-user-modal", handleOpenModal);
		return () => window.removeEventListener("open-new-user-modal", handleOpenModal);
	}, []);

	return {
		modalVisible,
		editingUser,
		openModal,
		closeModal,
	};
}
