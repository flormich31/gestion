import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Compras from "./pages/compras";
import Ventas from "./pages/ventas";
import Marcas from "./pages/marcas";
import Categorias from "./pages/categorias";
import Clientes from "./pages/clientes";
import Proveedores from "./pages/Proveedores";
import ListadoVentas from "./pages/listadoVentas";
import ListadoCompras from "./pages/listadoCompras";
import Profile from "./pages/profile";
import Productos from "./pages/productos";
import ProductoNuevo from "./pages/productoNuevo";
import Usuarios from "./pages/usuarios";
import Ticket from "./pages/ticketVenta";

export default function App() {
  document.title = "Diva Forever";
  // alert(process.env.REACT_APP_API)
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/compras">
            <Compras/>
          </Route>
          <Route path="/ventas">
            <Ventas/>
          </Route>
          <Route path="/ticketVenta/:IdVenta">
            <Ticket/>
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
          <Route path="/usuarios">
            <Usuarios />
          </Route>
          <Route path="/listadoVentas">
            <ListadoVentas />
          </Route>
          <Route path="/listadoCompras">
            <ListadoCompras/>
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
