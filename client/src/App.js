import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Ventas from "./pages/ventas";
import Marcas from "./pages/marcas";
import Categorias from "./pages/categorias";
import Clientes from "./pages/clientes";
import Proveedores from "./pages/Proveedores";
import Reports from "./pages/reports";
import ListadoVentas from "./pages/listadoVentas";
import Profile from "./pages/profile";
import Productos from "./pages/productos";
import ProductoNuevo from "./pages/productoNuevo";
import Vendedores from "./pages/vendedores";

export default function App() {
  document.title = "Diva Forever";

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/ventas">
            <Ventas/>
          </Route>
          <Route path="/productos">
            <Productos />
            </Route>
            <Route path="/productoNuevo">
            <ProductoNuevo />
          </Route>
          <Route path="/categorias">
            <Categorias />
          </Route>
          <Route path="/marcas">
            <Marcas />
          </Route>
          <Route path="/clientes">
            <Clientes />
          </Route>
          <Route path="/proveedores">
            <Proveedores />
          </Route>
          <Route path="/vendedores">
            <Vendedores />
          </Route>
          <Route path="/listadoVentas">
            <ListadoVentas />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Users() {
  return <h2>Users</h2>;
}
