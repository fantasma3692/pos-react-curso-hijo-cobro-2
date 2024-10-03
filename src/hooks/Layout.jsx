import styled from "styled-components";
import {
  Sidebar,
  SwitchHamburguesa,
  Spinner1,
  useEmpresaStore,
  useUsuariosStore,
  MenuMovil,
  useSucursalesStore,
} from "../index";
import { useState } from "react";
import { Device } from "../styles/breakpoints";
import { useQuery } from "@tanstack/react-query";
export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stateMenu, setStateMenu] = useState(false);

  const { datausuarios, mostrarusuarios } = useUsuariosStore();
  const { mostrarempresa } = useEmpresaStore();
  const { mostrarSucursalesAsignadas } = useSucursalesStore();
  const {
   
    refetch: refetchUsuarios,
  } = useQuery({
    queryKey: "mostrar usuarios",
    queryFn: mostrarusuarios,
    refetchOnWindowFocus: false,
    
  });
  useQuery({
    queryKey: ["mostrar sucursales asignadas", datausuarios?.id],
    queryFn: () => mostrarSucursalesAsignadas({ id_usuario: datausuarios?.id }),enabled:!!datausuarios,
    refetchOnWindowFocus: false
  });
 const {isLoading,error}= useQuery({
    queryKey: ["mostrar empresa", datausuarios?.id],
    queryFn: () => mostrarempresa({ _id_usuario: datausuarios?.id }),
    enabled: !!datausuarios,
    refetchOnWindowFocus: false,
  });
  
  if (datausuarios == null) {
    refetchUsuarios();
  }
  if (isLoading) {
    return <Spinner1 />;
  }
  if (error) {
    return <span>error...</span>;
  }
  return (
    <Container className={sidebarOpen ? "active" : ""}>
      <section className="contentSidebar">
        <Sidebar
          state={sidebarOpen}
          setState={() => setSidebarOpen(!sidebarOpen)}
        />
      </section>
      <section className="contentMenuhambur">
        <SwitchHamburguesa
          state={stateMenu}
          setstate={() => setStateMenu(!stateMenu)}
        />
        {stateMenu && <MenuMovil setState={() => setStateMenu(!stateMenu)} />}
      </section>
      <Containerbody>{children}</Containerbody>
    </Container>
  );
}
const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  transition: 0.1s ease-in-out;
  color: ${({ theme }) => theme.text};
  .contentSidebar {
    display: none;
    /* background-color: rgba(78, 45, 78, 0.5); */
  }
  .contentMenuhambur {
    position: absolute;
    /* background-color: rgba(53, 219, 11, 0.5); */
  }
  @media ${Device.tablet} {
    grid-template-columns: 88px 1fr;
    &.active {
      grid-template-columns: 260px 1fr;
    }
    .contentSidebar {
      display: initial;
    }
    .contentMenuhambur {
      display: none;
    }
  }
`;
const Containerbody = styled.section`
  /* background-color: rgba(231, 13, 136, 0.5); */
  grid-column: 1;
  width: 100%;

  @media ${Device.tablet} {
    margin-top: 0;
    grid-column: 2;
  }
`;
