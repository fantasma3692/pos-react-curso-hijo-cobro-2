import styled from "styled-components";
import { useCartVentasStore } from "../../../store/CartVentasStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { InputText } from "../formularios/InputText";
import { FormatearNumeroDinero } from "../../../utils/Conversiones";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Btn1 } from "../../moleculas/Btn1";
import { useUsuariosStore } from "../../../store/UsuariosStore";
import { useSucursalesStore } from "../../../store/SucursalesStore";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useVentasStore } from "../../../store/VentasStore";
import { useDetalleVentasStore } from "../../../store/DetalleVentasStore";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PanelBuscador } from "./PanelBuscador";
import { useClientesProveedoresStore } from "../../../store/ClientesProveedoresStore";
export const IngresoCobro = forwardRef((props, ref) => {
  const { tipocobro, total, items, setStatePantallaCobro, resetState } =
    useCartVentasStore();
  //Valores a calcular
  const [stateBuscadorClientes, setStateBuscadorClientes] = useState(false);
  const [precioVenta, setPrecioVenta] = useState(total);
  const [valorTarjeta, setValorTarjeta] = useState(
    tipocobro === "tarjeta" ? total : 0
  );
  const [valorEfectivo, setValorEfectivo] = useState(
    tipocobro === "efectivo" ? total : 0
  );
  const [valorCredito, setValorCredito] = useState(
    tipocobro === "credito" ? total : 0
  );
  //Valores a mostrar
  const [vuelto, setVuelto] = useState(0);
  const [restante, setRestante] = useState(0);
  //datos de la store
  const { datausuarios } = useUsuariosStore();
  const { sucursalesItemSelectAsignadas } = useSucursalesStore();
  const { dataempresa } = useEmpresaStore();
  const { idventa, insertarVentas, resetearventas } = useVentasStore();
  const { insertarDetalleVentas } = useDetalleVentasStore();
  //#region Clientes
  const {
    buscarCliPro,
    setBuscador,
    buscador,
    selectCliPro,
    cliproItemSelect,
  } = useClientesProveedoresStore();
  const { data: dataBuscadorcliente, isLoading: isloadingBuscadorCliente } =
    useQuery({
      queryKey: ["buscar cliente", [dataempresa?.id, "cliente", buscador]],
      queryFn: () =>
        buscarCliPro({
          id_empresa: dataempresa?.id,
          tipo: "cliente",
          buscador: buscador,
        }),
      enabled: !!dataempresa,
      refetchOnWindowFocus: false,
    });
  //#endregion

  // Función para calcular vuelto y restante
  const calcularVueltoYRestante = () => {
    const totalPagado = valorTarjeta + valorEfectivo + valorCredito;
    if (totalPagado >= precioVenta) {
      setVuelto(totalPagado - precioVenta);
      setRestante(0);
    } else {
      setVuelto(0);
      setRestante(precioVenta - totalPagado);
    }
  };
  //Manejadores de cambio
  const handleChangeValorEfectivo = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setValorEfectivo(value);
  };
  const handleChangeValorCredito = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setValorCredito(value);
  };
  const handleChangeValorTarjeta = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setValorTarjeta(value);
  };
  // Exponiendo la función mutation a través de ref
  useImperativeHandle(ref, () => ({
    mutateAsync: mutation.mutateAsync,
  }));
  //Funcion para realizar la venta
  const mutation = useMutation({
    mutationKey: "insertar ventas",
    mutationFn: insertarventas,
    onSuccess: () => {
      if (restante != 0) {
        return;
      }
      setStatePantallaCobro({ tipocobro: "" });
      resetState();
      resetearventas();
      toast.success("🎉 venta generada correctamente!!!");
    },
  });
  async function insertarventas() {
    if (restante === 0) {
      const pventas = {
        id_cliente:cliproItemSelect?.id,
        id_usuario: datausuarios?.id,
        id_sucursal: sucursalesItemSelectAsignadas?.id_sucursal,
        id_empresa: dataempresa?.id,
        estado: "confirmada",
        vuelto: vuelto,
        efectivo: parseFloat(valorEfectivo),
        credito: parseFloat(valorCredito),
        tarjeta: parseFloat(valorTarjeta),
        monto_total: total,
        tipo_de_pago: tipocobro,
      };
      if (idventa === 0) {
        const result = await insertarVentas(pventas);
        items.forEach(async (item) => {
          if (result?.id > 0) {
            item._id_venta = result?.id;
            await insertarDetalleVentas(item);
          }
        });
      }
    } else {
      toast.warning("Falta completar el pago, el restante tiene que ser 0");
    }
  }
  //useEffect para recalcular cuando los valores cambian
  useEffect(() => {
    calcularVueltoYRestante();
  }, [precioVenta, valorTarjeta, valorEfectivo, valorCredito]);
  return (
    <Container>
      {mutation.isPending ? (
        <span>guardando...🐖</span>
      ) : (
        <>
          {mutation.isError && <span>error: {mutation.error.message}</span>}
          <section className="area1">
            <span className="tipocobro">{tipocobro}</span>
            <Icon
              className="icono"
              icon="fluent-emoji:smiling-face-with-sunglasses"
            />
            <span>cliente</span>
            <EditButton
              onClick={() => setStateBuscadorClientes(!stateBuscadorClientes)}
            >
              <Icon className=" icono" icon="lets-icons:edit-fill" />
            </EditButton>
            <span className="cliente">{cliproItemSelect?.nombres}</span>
          </section>
          <Linea />
          <section className="area2">
            {tipocobro != "efectivo" && tipocobro != "mixto" ? null : (
              <InputText textalign="center">
                <input
                  onChange={handleChangeValorEfectivo}
                  defaultValue={tipocobro === "mixto" ? "" : total}
                  className="form__field"
                  type="number"
                />
                <label className="form__label">efectivo</label>
              </InputText>
            )}
            {tipocobro != "tarjeta" && tipocobro != "mixto" ? null : (
              <InputText textalign="center">
                <input
                  onChange={handleChangeValorTarjeta}
                  defaultValue={tipocobro === "mixto" ? "" : total}
                  disabled={tipocobro === "mixto" ? false : true}
                  className="form__field"
                  type="number"
                />
                <label className="form__label">tarjeta</label>
              </InputText>
            )}
            {tipocobro != "credito" && tipocobro != "mixto" ? null : (
              <InputText textalign="center">
                <input
                  onChange={handleChangeValorCredito}
                  defaultValue={tipocobro === "mixto" ? "" : total}
                  disabled={tipocobro === "mixto" ? false : true}
                  className="form__field"
                  type="number"
                />
                <label className="form__label">credito</label>
              </InputText>
            )}
          </section>
          <Linea />
          <section className="area3">
            <article className="etiquetas">
              <span className="total">Total: </span>
              <span>Vuelto: </span>
              <span>Restante: </span>
            </article>
            <article>
              <span className="total">{FormatearNumeroDinero(total)}</span>
              <span>{vuelto}</span>
              <span>{restante}</span>
            </article>
          </section>
          <Linea />
          <section className="area4">
            <Btn1
              funcion={() => mutation.mutateAsync()}
              border="2px"
              titulo="COBRAR (enter)"
              bgcolor="#0aca21"
              color="#ffffff"
              width="100%"
            />
          </section>
          {stateBuscadorClientes && (
            <PanelBuscador selector={selectCliPro} setBuscador={setBuscador} displayField="nombres" data={dataBuscadorcliente} 
              setStateBuscador={() =>
                setStateBuscadorClientes(!stateBuscadorClientes)
              }
            />
          )}
        </>
      )}
    </Container>
  );
});
const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 15px 0px #e2e2e2;
  gap: 12px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  color: #000;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 22px;

  input {
    color: #000 !important;
    font-weight: 700;
  }
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 5px;
    height: 6px;
    width: 380px;
  }
  &:before {
    top: -5px;
    background: radial-gradient(
        circle,
        transparent,
        transparent 50%,
        #fbfbfb 50%,
        #fbfbfb 100%
      ) -7px -8px / 16px 16px repeat-x;
  }
  &:after {
    bottom: -5px;
    background: radial-gradient(
        circle,
        transparent,
        transparent 50%,
        #fbfbfb 50%,
        #fbfbfb 100%
      ) -7px -2px / 16px 16px repeat-x;
  }
  .area1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tipocobro {
      position: absolute;
      right: 6px;
      top: 6px;
      background-color: rgba(233, 6, 184, 0.2);
      padding: 5px;
      color: #e61eb1;
      border-radius: 5px;
      font-size: 15px;
      font-weight: 650;
    }
    .cliente {
      font-weight: 700;
    }
  }
  .area2 {
    input {
      font-size: 40px;
    }
  }
  .area3 {
    display: flex;
    justify-content: space-between;
    width: 100%;

    article {
      display: flex;
      flex-direction: column;
    }
    .total {
      font-weight: 700;
    }
    .etiquetas {
      text-align: end;
    }
  }
`;

const Linea = styled.span`
  width: 100%;
  border-bottom: dashed 1px #d4d4d4;
`;
const EditButton = styled.button`
  background-color: #62c6f7;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  .icono {
    font-size: 20px;
  }
`;
