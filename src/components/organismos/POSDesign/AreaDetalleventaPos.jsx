import styled from "styled-components";

import { blur_in } from "../../../styles/keyframes";
import { FormatearNumeroDinero } from "../../../utils/Conversiones";
import {
  Btn1,
  Lottieanimacion,
  useCartVentasStore,
  useEmpresaStore,
} from "../../../index";
import animacionvacio from "../../../assets/vacioanimacion.json";
import { Icon } from "@iconify/react/dist/iconify.js";

export function AreaDetalleventaPos() {
  const { items, addcantidadItem, restarcantidadItem, removeItem } =
    useCartVentasStore();
  const { dataempresa } = useEmpresaStore();

  return (
    <AreaDetalleventa className={items.length > 0 ? "" : "animacion"}>
      {items.length > 0 ? (
        items.map((item, index) => {
          return (
            <Itemventa key={index}>
              <article className="contentdescripcion">
                <span className="descripcion">
                   {item._descripcion}
                </span>
                <span className="importe">
                  <strong>precio unit:</strong> 
                  🪵{FormatearNumeroDinero(item._precio_venta,dataempresa?.currency,dataempresa?.iso)}
                </span>
              </article>
              <article className="contentbtn">
                <Btn1
                  bgcolor="#0aca21"
                  color="#ffffff"
                  funcion={() => addcantidadItem(item)}
                  width="20px"
                  height="35px"
                  icono={<Icon icon="mdi:add-bold" />}
                ></Btn1>
                <span className="cantidad">{item._cantidad}</span>
                <Btn1
                  funcion={() => restarcantidadItem(item)}
                  width="20px"
                  height="35px"
                  icono={<Icon icon="subway:subtraction-1" />}
                ></Btn1>
              </article>
              <article className="contentcantidad">
                <span className="cantidad">
                  <strong>
                    {FormatearNumeroDinero(
                      item._total,
                      dataempresa?.currency,
                      dataempresa?.iso
                    )}
                  </strong>
                </span>
                <span className="delete" onClick={() => removeItem(item)}>
                  💀
                </span>
              </article>
            </Itemventa>
          );
        })
      ) : (
        <Lottieanimacion animacion={animacionvacio} alto="200" ancho="200" />
      )}
    </AreaDetalleventa>
  );
}
const AreaDetalleventa = styled.section`
  display: flex;
  width: 100%;
  margin-top: 10px;
  flex-direction: column;
  gap: 10px;
  &.animacion {
    height: 100%;
    justify-content: center;
  }
`;
const Itemventa = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px dashed ${({ theme }) => theme.color2};
  animation: ${blur_in} 0.2s linear both;

  .contentdescripcion {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    .descripcion {
      font-weight: 700;
      font-size: 20px;
    }
    .importe {
      font-size: 15px;
    }
  }
  .contentbtn {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 10px;
    align-items: center;
    justify-content: center;
    .cantidad{
      font-size:1.8rem;
      font-weight:700;
    }
  }
  .contentcantidad {
    display: flex;
    flex-direction: column;
    justify-content: end;
    text-align: end;
    margin-bottom: 10px;
    width: 100%;
    .delete {
      cursor: pointer;
      width: 20px;
      align-self: flex-end;
    }
  }
`;
