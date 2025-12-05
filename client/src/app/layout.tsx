import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "AMB de usuarios",
  description: "ABM de usuarios dux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className="h-full m-0 p-0"
        style={{
          fontFamily: "Inter, Arial, Helvetica, sans-serif",
          backgroundColor: "#f5f6fa",
          color: "#1f2937",
        }}
      >
        <Suspense fallback={<div>Cargando...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
