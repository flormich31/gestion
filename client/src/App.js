import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Ventas from "./pages/ventas";
import Clientes from "./pages/clientes";
import Proveedores from "./pages/Proveedores";
import Reports from "./pages/reports";
import Profile from "./pages/profile";
import Productos from "./pages/productos";

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
          <Route path="/proveedores">
            <Proveedores />
          </Route>
          <Route path="/clientes">
            <Clientes />
          </Route>
          <Route path="/reports">
            <Reports />
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
