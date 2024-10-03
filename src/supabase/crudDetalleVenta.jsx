import Swal from "sweetalert2";
import { supabase } from "../index";
const tabla = "detalle_venta";
export async function InsertarDetalleVentas(p) {
  const { error } = await supabase.rpc("insertardetalleventa", p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...detalle venta",
      text: error.message,
    });
    return;
  }
}

export async function MostrarDetalleVenta(p) {
  console.log("idventa", p);
  const { data, error } = await supabase.rpc("mostrardetalleventa", {
    _id_venta: p.id_venta,
  });
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...detalle venta",
      text: error.message,
    });
    return;
  }
  return data;
}
// export async function BuscarProductos(p) {
//   const { data } = await supabase.rpc("buscarproductos",{_id_empresa:p.id_empresa,buscador:p.buscador})

//   return data;
// }
export async function EliminarDetalleVentas(p) {
  const { error } = await supabase.from(tabla).delete().eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
}
// export async function EditarProductos(p) {
//   const { error } = await supabase.rpc("editarproductos", p);
//   if (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...al editar productos",
//       text: error.message,
//     });
//     return;
//   }

// }

// export async function MostrarUltimoProducto(p) {
//   const { data } = await supabase
//     .from(tabla)
//     .select()
//     .eq("id_empresa", p.id_empresa)
//     .order("id", { ascending: false }).maybeSingle();

//   return data;
// }
