import { Grid } from "@chakra-ui/react";
import { SearchInput } from "./SearchInput";
import { FigureList } from "./FigureList";

export const FigureSearcherTool = () => {
  return (
    <Grid
      gridTemplateColumns="1fr"
      gridTemplateRows="70px 1fr"
      w="full"
      h="full"
    >
      <SearchInput />
      <FigureList />
    </Grid>
  );
};
