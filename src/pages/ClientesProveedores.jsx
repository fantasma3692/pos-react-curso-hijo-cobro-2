import { useQuery } from "@tanstack/react-query";
import { ClientesProveedoresTemplate } from "../components/templates/ClientesProveedoresTemplate";
import { useEmpresaStore } from "../store/EmpresaStore";
import { useClientesProveedoresStore } from "../store/ClientesProveedoresStore";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export function ClientesProveedores() {
  const location = useLocation();
  const { tipo, mostrarCliPro, buscarCliPro, buscador, setBuscador } =
    useClientesProveedoresStore();

  const { dataempresa } = useEmpresaStore();
  const { isLoading } = useQuery({
    queryKey: [
      "mostrar clientes proveedores",
      {
        dataempresa: dataempresa?.id,
        tipo:
          location.pathname === "/configuracion/clientes"
            ? "cliente"
            : "proveedor",
      },
    ],
    queryFn: () =>
      mostrarCliPro({
        id_empresa: dataempresa?.id,
        tipo:
          location.pathname === "/configuracion/clientes"
            ? "cliente"
            : "proveedor",
      }),
    enabled: !!dataempresa,
    refetchOnWindowFocus: false,
  });

  //buscador
  useQuery({
    queryKey: [
      "buscar clientes proveedores",
      {
        dataempresa: dataempresa?.id,
        tipo:
          location.pathname === "/configuracion/clientes"
            ? "cliente"
            : "proveedor",
        buscador: buscador,
      },
    ],
    queryFn: () =>
      buscarCliPro({
        id_empresa: dataempresa?.id,
        tipo:
          location.pathname === "/configuracion/clientes"
            ? "cliente"
            : "proveedor",
        buscador: buscador,
      }),
    enabled: !!dataempresa,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <span>cargando...</span>;
  }

  return <ClientesProveedoresTemplate />;
}
