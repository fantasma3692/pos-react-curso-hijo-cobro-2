import { create } from "zustand";
import { EditarEmpresa, EditarMonedaEmpresa, InsertarEmpresa, MostrarEmpresaXidsuario } from "../index";
export const useEmpresaStore = create((set) => ({
  dataempresa: [],
  mostrarempresa: async (p) => {
    const response = await MostrarEmpresaXidsuario(p);
    set({ dataempresa: response });
    return response;
  },
  insertarempresa: async (p) => {
    const response = await InsertarEmpresa(p);
    console.log("respuesta empresa", response);
  },
  editarEmpresa:async(p,fileold,filenew)=>{
    await EditarEmpresa(p,fileold,filenew)
  },
  editarMonedaEmpresa:async(p)=>{
    await EditarMonedaEmpresa(p)
  }

}));
