import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCartVentasStore } from "../../../store/CartVentasStore";
import { IngresoCobro } from "./IngresoCobro";
export function PantallaCobro() {
  const [stateVerticket, setStateVerticker] = useState(false);
  const { setStatePantallaCobro } = useCartVentasStore();
  const ingresoCobroRef = useRef();
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Evita el comportamiento predeterminado de presionar Enter (como cerrar la vista)
        if (ingresoCobroRef.current) {
          ingresoCobroRef.current.mutateAsync();
        }
      }
    };
    // Añade el event listener al document
    document.addEventListener('keydown', handleKeyDown);
    // Limpia el event listener al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <Container>
      <section className="contentingresocobro">
        <article
          className="contentverticket"
          onClick={() => setStateVerticker(!stateVerticket)}
        >
          <span>{stateVerticket ? "ocultar" : "mostrar"} ticket</span>
          {stateVerticket ? (
            <Icon className="icono" icon="fluent-emoji:monkey-face" />
          ) : (
            <Icon className="icono" icon="fluent-emoji:see-no-evil-monkey" />
          )}
        </article>
        <IngresoCobro ref={ingresoCobroRef} />
        <article className="contentverticket" onClick={setStatePantallaCobro}>
          <Icon className="icono" icon="ep:arrow-left-bold" />
          <span>volver</span>
        </article>
      </section>
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 100;
  background-color: ${({ theme }) => theme.bgtotal};
  .contentingresocobro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: calc(100% - 10rem);
    .contentverticket {
      align-self: flex-end;
      cursor: pointer;
      display: flex;
      gap: 10px;
      align-items: center;
      span {
        font-weight: 700px;
        font-size: 18px;
      }
      .icono {
        font-size: 30px;
      }
    }
  }
`;
