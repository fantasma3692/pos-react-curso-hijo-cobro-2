import styled from "styled-components";
import { Btn1 } from "../../moleculas/Btn1";
import { Device } from "../../../styles/breakpoints";
import { Icon } from "@iconify/react";
import { useCartVentasStore, useDetalleVentasStore, useEmpresaStore } from "../../..";
import {FormatearNumeroDinero} from "../../../utils/Conversiones"
export function TotalPos() {
  const {total,setStatePantallaCobro} = useCartVentasStore()
  const {dataempresa} = useEmpresaStore()
  // const textLength = total.length;
  // // Definir las clases CSS para diferentes longitudes de texto
  // let textSizeClass = 'medium-text';
  // if (textLength < 10) {
  //   textSizeClass = 'large-text';
  // } else if (textLength < 20) {
  //   textSizeClass = 'medium-text';
  // } else {
  //   textSizeClass = 'small-text';
  // }
  return (
    <Container>
    <section className="imagen">
        <img src="https://i.ibb.co/HdYgDdp/corazon-2.png" />
      </section>
      <section className="contentTotal">
        <section className="contentTituloTotal">
          <Btn1 border="2px"  bgcolor="#ffffff"   color="#207c33" funcion={()=>setStatePantallaCobro({tipocobro:"mixto"})} titulo="COBRAR" icono={<Icon icon="fluent-emoji:money-with-wings" />} />
          <Btn1 border="2px"  bgcolor="#3FF563" titulo="..." icono={<Icon icon="fluent-emoji:safety-vest" />}/>
        </section>
        <span>{FormatearNumeroDinero(total,dataempresa?.currency,dataempresa?.iso)}</span>
      
      </section> 
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  border-radius: 15px;
  font-weight: 700;
  font-size: 38px;
  background-color: #3ff563;
  padding: 10px;
  color: #207c33;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    background-color: #7fff99;
    position: absolute;
    border-radius: 50%;
    top: -20px;
    left: -15px;
  }
  &::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.bgtotal};
    position: absolute;
    border-radius: 50%;
    top: 5px;
    right: 5px;
  }
  .imagen {
    z-index: 1;
    width: 55px;
   
    position: relative;
    @media ${Device.desktop} {
      bottom: initial;
    }
    img {
      width: 100%;
    }
  }
  .contentTotal {
    z-index:10;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .contentTituloTotal {
      display: flex;
      align-items: center;
      margin-top: 30px;
      gap: 10px;
      @media ${Device.desktop} {
        display: none;
      }
    }
  }
`;
