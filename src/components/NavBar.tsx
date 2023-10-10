import {
  Box,
  Button,
  Select,
  Text,
} from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import { Logo } from "./Logo";
import { generateRandomMatrix } from "../features/tables/generateRandomMatrix";
import { useTablesStore } from "../store/tables";
import { useToolsStore } from "../store/tools";
import { Tool } from "../store/types";

export const NavBar = () => {
  const setTool = useToolsStore((state) => state.setTool);
  const tools = useToolsStore((state) => state.tools);
  const tables = useTablesStore((state) => state.tables);
  const addTable = useTablesStore(
    (state) => state.addTable
  );
  return (
    <Box
      as="header"
      position="relative"
      zIndex={5}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      h={70}
      px="62px"
      textColor={"var(--light)"}
      sx={{
        background: "var(--night)",
      }}
      borderBottom={"1px solid rgba(255,255,255,0.3)"}
      boxShadow={"0 0 24px 2px rgba(0,0,0,0.20)"}
    >
      <Logo />
      <Box>
        <Select
          size="xs"
          variant="outline"
          onChange={(
            e: React.ChangeEvent<HTMLSelectElement>
          ) => {
            const value = e.target.value;
            console.log();
            setTool(tools.find((t) => t.name === value));
          }}
        >
          {tools.map((t: Tool, index: number) => {
            return (
              <option
                selected={index == 0}
                key={`tool-${index}`}
                value={`${t.name}`}
                style={{
                  color: "black",
                }}
              >{`${t.name}`}</option>
            );
          })}
        </Select>
      </Box>
      <Box as="section">
        {/* <Button
          p={0}
          size="sm"
          leftIcon={
            <IconSun color="white"></IconSun>
          }
          onClick={() => {
            colorMode.toggleColorMode();
          }}
          bg="none"
        ></Button> */}

        <Button
          size={"sm"}
          colorScheme="pink"
          rightIcon={
            <Box
              opacity={1}
              border="2px solid rgba(255,255,255,1)"
              rounded="6px"
              sx={{ paddingX: "4px" }}
            >
              {tables && (
                <Text as="span">{tables.length}</Text>
              )}
            </Box>
          }
          onClick={() => {
            generateRandomMatrix(4, 1, 54);
          }}
          mr={4}
        >
          Ver mis tablas
        </Button>
        <Button
          size={"sm"}
          colorScheme="messenger"
          rightIcon={<IconPlus />}
          onClick={addTable}
        >
          Añadir tabla
        </Button>
      </Box>
    </Box>
  );
};
