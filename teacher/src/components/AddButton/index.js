import * as React from "react";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton({onPress}) {
  return (
    <Container
      sx={{ position: "fixed", width: "auto", bottom: 25, right: 10 }}
      elevation={3}
      onClick = {onPress}
    >
      <Fab color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    </Container>
  );
}
