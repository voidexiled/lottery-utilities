import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  //Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Logo } from "./Logo";
import { generateRandomMatrix } from "../features/tables/generateRandomMatrix";
import { useTablesStore } from "../store/tables";
import { useToolsStore } from "../store/tools";
import { Table as TableType, Tool } from "../store/types";
import { getURLImage } from "../features/images/generateTableImage";

import Select from "react-select";
import { customSelectStyles } from "./Reusable/styles/SelectStyles";
import { ChangeEvent, useRef } from "react";
//import { useFigureStore } from "../store/figures";



export const NavBar = () => {

  const tablesInfoDisclosure = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const toast = useToast();
  const { tools, setTool } = useToolsStore((state) => state);
  const { tables, removeTables, setTables } = useTablesStore((state) => state);
  //const { fullFigures } = useFigureStore((state) => state);

  const handleOnSelectImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      const promise = new Promise<void>((resolve, reject) => {
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const decoded = atob(content);
          const parsed = JSON.parse(decoded);
          const _tables = parsed as TableType[];
          setTables(_tables);
          resolve();
        };

        reader.onerror = () => {
          reject();
        };
      });

      reader.readAsText(file);

      toast.promise(
        promise,
        {
          loading: { title: "Importando tablas...", description: "Espera un momento..." },
          success: { title: "Tablas importadas!", description: "Se ha generado correctamente", duration: 700, isClosable: true },
          error: { title: "Error al importar!", description: "Ha ocurrido un error.", duration: 2000, isClosable: true },
        }
      );
    }
  };



  const addTableToStore = async () => {
    const size = 4;
    const matrix = generateRandomMatrix(size, 1, 54, 0);
    let lastIndex = 0;
    if (tables[0]) {
      lastIndex = tables[tables.length - 1].id + 1;
    }
    const table: TableType = {
      id: lastIndex,
      name: `Table${lastIndex}`,
      numbers: matrix,
      date: new Date().toISOString(),
      size: size,
      dataURL: await getURLImage(matrix, size),
    };
    setTables([table]);
  }

  //TODO Añadir tabla a el estado de imagenes con el boton de añadir tabla de la nav bar
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      gap={{ base: 2, lg: 0 }}
      as="header"
      position="relative"
      zIndex={5}
      grow={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      h={{ base: 160, lg: 70 }}
      px={{ base: 2, md: 5, xl: 62 }}
      py={{ base: 4, lg: 0 }}

      textColor={"var(--light)"}
      sx={{
        background: "var(--night)",
      }}
      borderBottom={"1px solid rgba(255,255,255,0.3)"}
      boxShadow={"0 0 24px 2px rgba(0,0,0,0.20)"}
    >
      <Logo />
      <Box width={{
        base: "320px",
        lg: "320px"
      }}
      >
        <Select
          styles={customSelectStyles(true)}
          options={tools.map((t: Tool) => {
            return { value: t.name, label: t.name }
          })}
          defaultValue={{ value: tools[0].name, label: tools[0].name }}
          onChange={(e) => {
            const value = e && 'value' in e ? e.value : tools[0].name;
            setTool(tools.find((t) => t.name === value));
          }}
        />

      </Box>
      <Flex as="section"
        gap={3}
        wrap={{
          base: "wrap",
          md: "nowrap"
        }}
        justifyContent={{
          base: "center",
          md: "flex-end"
        }}

      >

        <Button
          size={{ base: "xs", md: "sm" }}
          colorScheme="red"
          rightIcon={<IconTrash></IconTrash>}
          onClick={() => {
            removeTables();
          }}

        >

          Borrar tablas


        </Button>
        <Button
          size={{ base: "xs", md: "sm" }}
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
          onClick={
            tablesInfoDisclosure.onOpen
          }

        >
          Ver mis tablas
        </Button>
        <Button
          size={{ base: "xs", md: "sm" }}
          colorScheme="messenger"
          rightIcon={<IconPlus />}
          onClick={() => {
            const res = addTableToStore();

            toast.promise(res, {
              loading: { title: "Generando tabla...", description: "Espera un momento..." },
              success: { title: "Tabla generada!", description: "Se ha generado correctamente", duration: 700, isClosable: true },
              error: { title: "Error al generar", description: "Ha ocurrido un error.", duration: 2000, isClosable: true },
            })
          }}
        >
          Añadir tabla
        </Button>
      </Flex>
      <Modal

        isOpen={tablesInfoDisclosure.isOpen}
        onClose={tablesInfoDisclosure.onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        colorScheme="messenger"
        size={{
          base: "full",
          md: "xs",
          lg: "sm",
          xl: "md",
          "2xl": "lg",
        }}
        isCentered={true}
        closeOnEsc={true}
        closeOnOverlayClick={true}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent bgColor="var(--night)"
          textColor="var(--light)">
          <ModalHeader>
            <Text fontSize={21}>Ver mis tablas - {tables.length}</Text>
          </ModalHeader>

          <ModalFooter>
            <input id="importTablesInput" type="file" accept=".LOTT" onChange={handleOnSelectImportFile} hidden></input>
            <Button
              colorScheme="blue"
              mr={3}
              size="sm"
              onClick={() => {
                const fileInput = document.getElementById("importTablesInput");
                if (fileInput) {
                  fileInput.click();
                }
              }}
            >
              Importar
            </Button>
            <Button
              colorScheme="green"
              mr={3}
              size="sm"
              onClick={() => {
                let query = '';
                query = JSON.stringify(tables);
                query = btoa(query);
                const element = document.createElement("a");
                const file = new Blob([query], { type: 'text/plain' });
                element.href = URL.createObjectURL(file);
                element.download = "tables.LOTT";
                document.body.appendChild(element);
                element.click();

                console.log(query)
              }}
            >
              Exportar
            </Button>

            <Button onClick={tablesInfoDisclosure.onClose} size="sm" colorScheme="red">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>

      </Modal>
    </Flex >
  );
};
