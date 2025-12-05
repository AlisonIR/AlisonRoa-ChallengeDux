"use client";

import React from "react";
import { PrimeIcons } from "primereact/api";

export default function Topbar() {
  return (
		<div
			className="flex align-items-center justify-content-between fixed top-0 left-0 w-full z-5 shadow-2 h-3rem pl-3 pr-6"
			style={{
				background: "#0a58ca",
			}}
		>
			<img
				src="/DuxIcon.jpeg"
				alt="logo"
				className="h-2rem"
				style={{
					objectFit: "contain",
				}}
			/>

			<i className={`${PrimeIcons.COG} cursor-pointer text-xl text-white`} />
		</div>
	);
}
