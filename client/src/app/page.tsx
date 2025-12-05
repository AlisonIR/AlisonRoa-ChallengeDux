import React, { Suspense } from "react";
import UserTableWrapper from "./UserTableWrapper";
import { getUsers, User, PagedResult } from "../../lib/api";
import AppLayout from "../../components/layout/AppLayout";

export default async function Page({ searchParams }: any) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.search || "";
  const estado = (searchParams?.estado || "") as
    | ""
    | "Habilitado"
    | "Deshabilitado";

  const limit = 10;
  let initialUsers: User[] = [];
  let initialTotalRecords = 0;

  try {
    const res: PagedResult<User> = await getUsers(page, limit, search, estado);
    initialUsers = res.items.sort((a, b) => Number(b.id) - Number(a.id));
    initialTotalRecords = res.total;
  } catch {}

  return (
    <AppLayout>
      <UserTableWrapper
        initialUsers={initialUsers}
        initialTotalRecords={initialTotalRecords}
        initialPage={page}
        initialSearch={search}
        initialEstadoFilter={estado}
      />
    </AppLayout>
  );
}
