import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ListItemText from "@mui/material/ListItemText";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HomeIcon from "@mui/icons-material/Home";
import TaskIcon from '@mui/icons-material/Task';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ListIcon from '@mui/icons-material/List';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BallotIcon from '@mui/icons-material/Ballot';
import InputIcon from '@mui/icons-material/Input';
import { useHistory } from "react-router-dom";

export const MainListItems = () => {
  const history = useHistory();

  const goto = (path) => {
    history.push(path);
  };
  return (
    <div>
      <ListItem onClick={() => goto("/home")}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItem>
      <ListItem onClick={() => goto("/compras")}>
        <ListItemIcon>
          <InputIcon />
        </ListItemIcon>
        <ListItemText primary="Compras" />
      </ListItem>
      <ListItem onClick={() => goto("/ventas")}>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Ventas" />
      </ListItem>
      <ListItem onClick={() => goto("/productos")}>
        <ListItemIcon>
          <TaskIcon />
        </ListItemIcon>
        <ListItemText primary="Productos" />
      </ListItem>
      <ListItem onClick={() => goto("/categorias")}>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Categorias" />
      </ListItem>
      <ListItem onClick={() => goto("/marcas")}>
        <ListItemIcon>
          <LocalActivityIcon />
        </ListItemIcon>
        <ListItemText primary="Marcas" />
      </ListItem>
      <ListItem onClick={() => goto("/clientes")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>
      <ListItem onClick={() => goto("/proveedores")}>
        <ListItemIcon>
          <StorefrontIcon />
        </ListItemIcon>
        <ListItemText primary="Proveedores" />
      </ListItem>
      <ListItem onClick={() => goto("/usuarios")}>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItem>
      <ListItem  onClick={() => goto("/listadoVentas")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Listado de ventas" />
      </ListItem>
      <ListItem  onClick={() => goto("/listadoCompras")}>
        <ListItemIcon>
          <PlaylistAddIcon />
        </ListItemIcon>
        <ListItemText primary="Listado de compras" />
      </ListItem>
    </div>
  );
};

export const SecondaryListItems = function () {
  const history = useHistory();

  const goto = (path) => {
    history.push(path);
  };
  return (
    <div>
      <ListItem button onClick={() => goto("/profile")}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Mi perfil" />
      </ListItem>
      <ListItem button onClick={() => goto("/")}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Cerrar sesi&oacute;n" />
      </ListItem>
    </div>
  );
};
