import { create } from "zustand";
import {
  EliminarAlmacen,
  InsertarStockAlmacen,
  MostrarStockAlmacenXSucursal,MostrarAlmacenXSucursal
} from "../index";

export const useAlmacenesStore = create((set,get) => ({
  dataalmacen: [],
  dataalmacenxsucursalxproducto: [],
  mostrarAlmacen: async (p) => {
    const response = await MostrarStockAlmacenXSucursal(p);
    set({ dataalmacen: response });
    return response;
  },
  mostrarAlmacenXsucursal: async (p) => {
    const response = await MostrarAlmacenXSucursal(p);
    set({ dataalmacenxsucursalxproducto: response });
    const {dataalmacenxsucursalxproducto} =get()
    return dataalmacenxsucursalxproducto;
  },
  insertarStockAlmacenes: async (p) => {
    await InsertarStockAlmacen(p);
  },
  eliminarAlmacen: async (p) => {
    await EliminarAlmacen(p);
  },
  
}));
