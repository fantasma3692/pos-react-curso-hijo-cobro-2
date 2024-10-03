import { create } from "zustand";
import {
  InsertarVentas,
  EliminarVentasIncompletas,
  MostrarVentasXsucursal,
} from "../index";

export const useVentasStore = create((set) => ({
  dataventas: [],
  idventa: 0,
  resetearventas:()=>set({
    idventa:0
  }),
  insertarVentas: async (p) => {
    const result = await InsertarVentas(p);
    set({ idventa: result?.id });
 
    return result;
  },
  eliminarventasIncompletas: async (p) => {
    // await EliminarVentasIncompletas(p);
  },
  mostrarventasxsucursal: async (p) => {
    const response = await MostrarVentasXsucursal(p);
    set({ dataventas: response });
    set({idventa:response?.id?response?.id:0})
    return response;
  },
}));
