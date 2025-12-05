"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex w-full h-screen overflow-hidden bg-white">
			<Topbar />
			<Sidebar />

			<div className="flex flex-column w-full">
				<div
					className="p-4 overflow-y-auto border-round-top-left-md"
					style={{
						height: "calc(100vh - 58px)",
						marginTop: "58px",
						marginLeft: "70px",
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
