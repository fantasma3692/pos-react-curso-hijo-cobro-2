import { Routes, Route, Navigate } from "react-router-dom";
import {
  Categorias,
  Configuraciones,
  Home,
  Login,
  Productos,
  ProtectedRoute,
  POS,
  Layout,
  PageNot,
  Empresa,
  ClientesProveedores,
} from "../index";
import { BasicosConfig } from "../components/organismos/EmpresaConfigDesign/BasicosConfig";
import { MonedaConfig } from "../components/organismos/EmpresaConfigDesign/MonedaConfig";

export function MyRoutes() {
 

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectedRoute accessBy="non-authenticated">
           
                <Login />
            
          
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />
       <Route 
        path="/configuracion"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Configuraciones />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracion/categorias"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Categorias />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracion/productos"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Productos />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracion/empresa"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Empresa />
            </Layout>
          </ProtectedRoute>
        }
      >
      <Route index element={<Navigate to ="empresabasicos"/>}/>  
      <Route path="empresabasicos" element={<BasicosConfig/>}/>  
      <Route path="monedaconfig" element={<MonedaConfig/>}/> 
      </Route>
       <Route
        path="/pos"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <POS />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNot/>}/>
      <Route
        path="/configuracion/clientes"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <ClientesProveedores />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracion/proveedores"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <ClientesProveedores />
            </Layout>
          </ProtectedRoute>
        }
      />

      
    </Routes>
  );
}
