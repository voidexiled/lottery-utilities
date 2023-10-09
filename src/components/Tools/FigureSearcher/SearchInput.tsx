import {
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons-react";
import { useFigureStore } from "../../../store/figures";

export const SearchInput = () => {
  const setFigures = useFigureStore(
    (state) => state.setFigures
  );

  const fullFigures = useFigureStore(
    (state) => state.fullFigures
  );
  return (
    <InputGroup size="sm">
      <InputLeftElement pointerEvents="none">
        <IconSearch color="rgba(255,255,255,0.3)"></IconSearch>
      </InputLeftElement>
      <Input
        placeholder="El cantarito..."
        rounded="md"
        border="1px solid rgba(255,255,255,0.3)"
        textColor={"var(--light)"}
        colorScheme="pink"
        onChange={(e) => {
          const value = e.target.value;
          if (value.length > 0) {
            const newList = fullFigures.filter(
              (fig) =>
                fig.name
                  .toLowerCase()
                  .includes(
                    value.toLowerCase()
                  )
            );
            setFigures(newList);
          } else {
            setFigures(fullFigures);
          }
        }}
      ></Input>
    </InputGroup>
  );
};
