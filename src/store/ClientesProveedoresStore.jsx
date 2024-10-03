import { create } from "zustand";
import {MostrarClientesProveedores,InsertarClientesProveedores,EditarClientesProveedores,EliminarClientesProveedores,BuscarClientesProveedores} from "../supabase/crudClientesProveedores"
import { useLocation } from "react-router-dom";

export const useClientesProveedoresStore = create((set, get) => ({
  tipo:"",
  setTipo:(p)=>set({tipo:p}),
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataclipro: [],
  cliproItemSelect: [],
  parametros: {},
  mostrarCliPro: async (p) => {
    const response = await MostrarClientesProveedores(p);
    set({ parametros: p });
    set({ dataclipro: response });
    // set({ cliproItemSelect: response[0] });
    return response;
  },
  selectCliPro: (p) => {
    set({ cliproItemSelect: p });
  },
  insertarCliPro: async (p, file) => {
    await InsertarClientesProveedores(p, file);
    const { mostrarCliPro } = get();
    const { parametros } = get();
    set(mostrarCliPro(parametros));
  },
  eliminarCliPro: async (p) => {
    await EliminarClientesProveedores(p);
    const { mostrarCliPro } = get();
    const { parametros } = get();
    set(mostrarCliPro(parametros));
  },
  editarCliPro: async (p, fileold, filenew) => {
    await EditarClientesProveedores(p, fileold, filenew);
    const { mostrarCliPro } = get();
    const { parametros } = get();
    set(mostrarCliPro(parametros));
  },
  buscarCliPro: async (p) => {
   
   
     const response = await BuscarClientesProveedores(p);
    set({ dataclipro: response });
    return response;
  },
}));
