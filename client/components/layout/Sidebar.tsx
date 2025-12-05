"use client";

import { Boxes } from "lucide-react";

export default function Sidebar() {
	return (
		<div
			className="flex flex-column align-items-center fixed left-0 top-0 h-screen"
			style={{ width: "70px", background: "#132537", paddingTop: "58px" }}
		>
			<div className="flex flex-column align-items-center gap-4 mt-4">
				<Boxes color="white" size={26} strokeWidth={1.7} />
				<Boxes color="white" size={26} strokeWidth={1.7} />
				<Boxes color="white" size={26} strokeWidth={1.7} />
				<Boxes color="white" size={26} strokeWidth={1.7} />
				<Boxes color="white" size={26} strokeWidth={1.7} />
				<Boxes color="white" size={26} strokeWidth={1.7} />
			</div>
		</div>
	);
}
