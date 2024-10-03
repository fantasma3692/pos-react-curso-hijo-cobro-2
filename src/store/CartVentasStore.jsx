import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useClientesProveedoresStore } from "./ClientesProveedoresStore";
const initialState = {
  items: [],
  total: 0,
  statePantallaCobro:false,
  tipocobro:""
};
function calcularTotal(items) {
  return items.reduce(
    (total, item) => total + item._precio_venta * item._cantidad,
    0
  );
}
export const useCartVentasStore = create(
  persist(
    (set) => ({
      ...initialState,

      addItem: (p) =>
        set((state) => {
          // Verificar si el producto ya está en el carrito
          const existingItem = state.items.find(
            (item) => item._id_producto === p._id_producto
          );
          if (existingItem) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            const updatedItems = state.items.map((item) => {
              if (item._id_producto === p._id_producto) {
                return {
                  ...item,
                  _cantidad: item._cantidad + 1,
                  _total: item._total + p._cantidad * p._precio_venta,
                };
              }
              return item;
            });
            return { items: updatedItems, total: calcularTotal(updatedItems) };
          } else {
            // Si el producto no está en el carrito, agregarlo
            return {
              items: [...state.items, p],
              total: calcularTotal([...state.items, p]),
            };
          }
        }),
      removeItem: (p) =>
        set((state) => ({
          items: state.items.filter((item) => item !== p),
        })),
      resetState: () => {
        const {selectCliPro} =useClientesProveedoresStore.getState()
        selectCliPro([])
        set(initialState)
      },
      addcantidadItem: (p) =>
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item._id_producto === p._id_producto && item._cantidad > 0) {
              const updatedItem = { ...item, _cantidad: item._cantidad + 1 };
              updatedItem._total=updatedItem._cantidad*updatedItem._precio_venta
              return updatedItem;
            }
            return item;
          });
          return { items: updatedItems, total: calcularTotal(updatedItems) };
        }),
      restarcantidadItem: (p) =>
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item._id_producto === p._id_producto && item._cantidad > 0) {
                const updatedQuantity = item._cantidad - 1;
                if (updatedQuantity === 0) {
                  return null;
                } else {
                 const updatedItem=  {
                    ...item,
                    _cantidad: updatedQuantity
                  };
                  updatedItem._total=updatedItem._cantidad*updatedItem._precio_venta 
                  return updatedItem
                }
              }
              return item;
            })
            .filter(Boolean); //Filtlar elementos nulos
          return { items: updatedItems, total: calcularTotal(updatedItems) };
        }),
        setStatePantallaCobro:(p)=>
          set((state)=>{
          if(state.items.length===0){
            toast.warning('Agrega productos, no seas puerco')
            return{
              state
            }
          }else{
            return{
              statePantallaCobro:!state.statePantallaCobro,
              tipocobro:p.tipocobro
            }
          }
        })
    }),
    {
      name: "cart-ventas-storage",
    }
  )
);
