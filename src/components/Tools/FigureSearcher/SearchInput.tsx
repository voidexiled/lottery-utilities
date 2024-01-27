import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import {
  IconBackspace,
  IconSearch,
} from "@tabler/icons-react";
import { useFigureStore } from "../../../store/figures";
import { motion } from "framer-motion";
import { useState } from "react";

export const SearchInput = () => {

  const { figures, fullFigures, setFigures } = useFigureStore((state) => state);
  const [figuresToList, setFiguresToList] = useState([...figures]);


  return (
    <InputGroup size="sm" overflow="hidden">
      <InputLeftElement ml={1} pointerEvents="none">
        <IconSearch color="rgba(255,255,255,0.3)"></IconSearch>
      </InputLeftElement>
      <InputRightElement
        rounded="lg"
        as={motion.div}
        whileHover={{
          cursor: "pointer",
          backgroundColor: "rgba(0,0,0,.15)",
          transition: {
            duration: 0.15,
          },
        }}
        onClick={() => {
          const input: HTMLInputElement = document.getElementById(
            "searchInput"
          ) as HTMLInputElement;
          if (input) {
            input.value = "";
            input.focus({ preventScroll: true });
            setFigures(fullFigures);

          }
        }}
      >
        <IconBackspace color="rgba(255,255,255,0.5)"></IconBackspace>
      </InputRightElement>
      <Input
        id="searchInput"
        pl={10}
        placeholder="El cantarito..."
        rounded="md"
        border="1px solid rgba(255,255,255,0.3)"
        textColor={"var(--light)"}
        colorScheme="pink"
        onChange={(e) => {
          const value = e.target.value;
          if (value.length > 0) {
            const newList = figuresToList.filter((fig) =>
              fig.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "")
                .includes(value.toLowerCase())
            );
            setFigures(newList);
          } else {
            setFiguresToList([...fullFigures]);
            setFigures(fullFigures);

          }
        }}
      ></Input>
    </InputGroup>
  );
};
