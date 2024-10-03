import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Btn1 } from "../moleculas/Btn1";
import { Toaster } from "sonner";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { useAuthStore } from "../../store/AuthStore";

export const EmpresaTemplate = () => {
  const {cerrarSesion} = useAuthStore()
  return(
<Main>
    <Toaster richColors   position="bottom-center"/>
    <PageContainer>
      <Content>
        <Outlet />
      </Content>
      <Sidebar>
        <SidebarSection>
          <SidebarTitle>Empresa</SidebarTitle>
          <SidebarItem to="empresabasicos">Básico</SidebarItem>
          <SidebarItem to="monedaconfig">Moneda</SidebarItem>
        </SidebarSection>

        <SidebarSection>
          <SidebarTitle >Esquemas</SidebarTitle>
          <SidebarItem to="macroprocesos">Macroprocesos</SidebarItem>
        </SidebarSection>
        <SidebarSection>
          <SidebarTitle to="ss">Soporte</SidebarTitle>
          <SidebarItem to="ss">Centro de ayuda</SidebarItem>
        </SidebarSection>
        <Btn1 funcion={cerrarSesion}
          bgcolor="transparent"
          color={({theme}) => theme.text}
          titulo="cerrar sesión"
        />
      </Sidebar>
    </PageContainer>
  </Main>
  )
  
};


const Main = styled.div`
  justify-content: center;
  width: 100%;
  display: flex;

`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 1200px;
  justify-content: center;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 768px) {
    width: 250px;
    order: 2;
  }
`;

const SidebarItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  margin: 5px 0;
  transition: all 0.3s ease-in-out;
  padding: 0 5%;
  position: relative;
  text-decoration: none;
  color: ${(props) => props.theme.text};
  height: 60px;

  &:hover {
    color: ${(props) => props.theme.colorSubtitle};
  }
  &.active {
    background: ${(props) => props.theme.bg6};
    border: 2px solid ${(props) => props.theme.bg5};
    color: ${(props) => props.theme.color1};
    font-weight: 600;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
`;

const SidebarTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.2em;
`;

const SidebarSection = styled.div`
  margin-bottom: 20px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.color2};
  padding: 12px;
`;