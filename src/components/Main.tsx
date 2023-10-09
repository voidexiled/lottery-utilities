import { Grid } from "@chakra-ui/react";
import { LeftBar } from "./LeftBar";
import { Viewer } from "./Viewer";

export const Main = () => {
  return (
    <Grid
      as="main"
      gridTemplateColumns="320px 1fr"
      gridTemplateRows="1fr"
      h={"calc(100vh - 70px)"}
      w="full"
    >
      <LeftBar></LeftBar>
      <Viewer></Viewer>
    </Grid>
  );
};
