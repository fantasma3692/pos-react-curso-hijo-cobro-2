import styled from "styled-components";
import { Device } from "../../../styles/breakpoints";
import { Btn1 } from "../../moleculas/Btn1";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCartVentasStore } from "../../../store/CartVentasStore";
export function FooterPos() {
  const {resetState} = useCartVentasStore()
  return (
    <Footer>
      <article className="content">
        <Btn1 bgcolor="#f44141" color="#fff" funcion={resetState} icono={<Icon icon="fluent-emoji-flat:skull" />} titulo="Eliminar venta" />
       
      </article>
    </Footer>
  );
}
const Footer = styled.section`
  grid-area: footer;
  /* background-color: rgba(57, 231, 26, 0.5); */
  display: none;
  
  @media ${Device.desktop} {
    display: flex;
  }
  .content {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
