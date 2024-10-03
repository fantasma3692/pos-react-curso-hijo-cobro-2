import { create } from "zustand";
import { MostrarSucursales, MostrarSucursalesAsignadasXuser } from "../index";

export const useSucursalesStore = create((set) => ({
  sucursalesItemSelect: [],
  selectSucursal: (p) => {
    set({ sucursalesItemSelect: p });
  },
  dataSucursales: [],
  dataSucursalesAsignadas: [],
  sucursalesItemSelectAsignadas: [],
  mostrarSucursales: async (p) => {
    const response = await MostrarSucursales(p);
    set({ dataSucursales: response });
    set({ sucursalesItemSelect: response[0] });
    return response;
  },
  mostrarSucursalesAsignadas: async (p) => {
    const response = await MostrarSucursalesAsignadasXuser(p);
    set({ dataSucursalesAsignadas: response });
    set ({sucursalesItemSelectAsignadas:response[0]})
    console.log(response[0])
    return response;
  },
}));
