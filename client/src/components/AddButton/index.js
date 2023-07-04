import * as React from "react";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const AddButton= () => {

const  openInNewTab = () => {
    window.open('/productos', '_blank');
}
  return (
    <Container
      sx={{ position: "fixed", width: "auto", bottom: 25, right: 10 }}
      elevation={3}
    >
      <Fab color="secondary" aria-label="add">
        <AddIcon onClick={openInNewTab} />
      </Fab>
    </Container>
  );
}
export default AddButton;