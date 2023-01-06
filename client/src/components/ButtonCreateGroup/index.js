import * as React from "react";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";

export default function ButtonCreateGroup() {
  const history = useHistory();
  const handlePressNew = (event) => {
    history.push("/group-create");
  };
  return (
    <Container
      sx={{ position: "fixed", width: "auto", bottom: 25, right: 10 }}
      elevation={3}
      onClick={handlePressNew}
    >
      <Fab color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    </Container>
  );
}
