import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { PictoListItems } from "./PictoListItems";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  ListItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function PictoBar({ onSelectPictograma }) {
  const history = useHistory();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const goto = function (path) {
    history.push(path);
  };

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  const drawerWidth = 350;

  const PictoBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginRight: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <div>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            px: [1],
            padding: "5px",
          }}
        >
          <Typography variante="h5" align="left" padding={2}>
            <h1>Actividad: Leer oraciones</h1>
            <h2>Ordena las imagenes segun la oración:</h2>
            <h3>"El niño habla con la abuela"</h3>
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem></ListItem>
        </List>
        <List>
          <PictoListItems onSelectPictograma={onSelectPictograma} />
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
