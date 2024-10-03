import { create } from "zustand";
import {
  InsertarDetalleVentas,
  MostrarDetalleVenta,
  EliminarDetalleVentas,
} from "../index";

export const useDetalleVentasStore = create((set, get) => ({
  datadetalleventa: [],
  parametros: {},
  total: 0,
  mostrardetalleventa: async (p) => {
    const response = await MostrarDetalleVenta(p);
    set({ parametros: p });
    set({ datadetalleventa: response });
    let total = 0;
    response?.forEach((item) => {
      const array = Object.values(item);
      total += array[4];
    });
    set({ total: total });
    return response;
  },
  insertarDetalleVentas: async (p) => {
    await InsertarDetalleVentas(p);
   
  },
  eliminardetalleventa: async (p) => {
    await EliminarDetalleVentas(p);
    const { mostrardetalleventa } = get();
    const { parametros } = get();
    set(mostrardetalleventa(parametros));
  },
}));
