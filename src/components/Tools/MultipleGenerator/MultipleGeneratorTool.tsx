import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useFigureStore } from '../../../store/figures';
import { Table } from '../../types';
import { useTablesStore } from '../../../store/tables';
import { Figure } from '../../../store/types';

export const MultipleGeneratorTool = () => {
  const tables = useTablesStore((state) => state.tables);
  const figures = useFigureStore((state) => state.figures);
  const nSetsModal = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [withoutComodin, setWithoutComodin] = useState(true)

  const handleGenerate54Comodin = (
    double?: boolean
  ): void => {
    if (!double) {
      console.log("No double");
    } else {
      console.log("Double");
    }
  };
  //TODO: CONVERTIR A USEDISCLOSURE CON INITIAL REF Y FINAL REF
  const openAlgoritmCEModal = () => {
    return;
  };

  const handleGenerate = () => {
    let comodin = Number((document.getElementById("comodinInput") as HTMLInputElement).value);
    const size = Number((document.getElementById("sizeInput") as HTMLInputElement).value);
    //const qyTables = Number((document.getElementById("cantidadTablasInput") as HTMLInputElement).value);
    if (withoutComodin) {
      comodin = 0;
    }
    const figuresId = figures.filter((f) => f.id !== comodin);

    if (!withoutComodin) {
      const figureComodin = figures.find((f) => f.id === comodin) as Figure;
      figuresId.unshift(figureComodin);
    }
    console.log(figuresId)
    const localTables: Table[] = [];


    let lastTableIndex = 0;
    if (tables[0]) {
      lastTableIndex = tables[tables.length - 1].id + 1;
    }

    // console.log(comodin, size, qyTables);
  }

  const NSetsModalUI = (
    <Modal
      isOpen={nSetsModal.isOpen}
      onClose={nSetsModal.onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      colorScheme="messenger"
      size={{ base: "full", md: "xs", lg: "sm", xl: "md", "2xl": "lg" }}
      isCentered={true}
      closeOnEsc={true}
      closeOnOverlayClick={true}
      motionPreset='slideInBottom'

    >
      <ModalOverlay />
      <ModalContent
        bgColor="var(--night)"
        textColor="var(--light)"
      >

        <ModalHeader fontSize={{ base: "18px" }}>Generar set de tablas</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>

            <FormLabel >
              <Checkbox size="sm" checked={withoutComodin} onChange={() => { setWithoutComodin(!withoutComodin) }}>Comodin</Checkbox>

            </FormLabel>
            <Select
              id="comodinInput"
              size="sm"
              variant="outline"
              borderColor="messenger.500"
              focusBorderColor="messenger.600"
              _hover={{
                borderColor:
                  "var(--chakra-colors-messenger-700);",
              }}
              className="customScrollBar"
              disabled={withoutComodin}
            >
              {figures.map((f) => {
                return (
                  <option
                    className="customScrollBar"
                    key={f.id}
                    value={f.id}
                    style={{
                      color: "black",
                    }}
                  >
                    {f.id + " - " + f.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel fontSize={{ base: "16px" }}>Cantidad de tablas:</FormLabel>
            <NumberInput
              id="cantidadTablasInput"
              size="sm"
              variant="outline"
              defaultValue={1}
              min={1}
              max={150}
            >
              <NumberInputField
                id="sizeInput"
                placeholder="4"
                borderColor="messenger.500"
                _focus={{
                  borderColor: "messenger.600",
                }}
                _hover={{
                  borderColor: "messenger.700",
                }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  borderColor="messenger.700"
                  color="white"
                  _active={{
                    bg: "messenger.500",
                  }}
                  children="+"
                />
                <NumberDecrementStepper
                  borderColor="messenger.700"
                  children="-"
                  color="white"
                  _active={{
                    bg: "pink.500",
                  }}
                />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} size="sm" onClick={handleGenerate}>
            Generar
          </Button>
          <Button onClick={nSetsModal.onClose} size="sm">
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  );

  return (
    <Flex
      as="section"
      w="full"
      h="full"
      direction="column"
      color="rgba(255,255,255,0.72)"
    >
      <Box mb={8}>
        <Text
          w="full"
          fontWeight="medium"
          fontSize={20}
          mb={2}
        >
          Generador Multiple
        </Text>
      </Box>
      <Box mb={8}>
        <FormControl as="form" pb={4}>
          <FormLabel fontSize={16} w="full">
            Columnas y Filas
            <NumberInput
              id="sizeInput"
              size="sm"
              variant="outline"
              defaultValue={4}
              min={3}
              max={5}
            >
              <NumberInputField
                id="sizeInput"
                placeholder="4"
                borderColor="messenger.500"
                _focus={{
                  borderColor: "messenger.600",
                }}
                _hover={{
                  borderColor: "messenger.700",
                }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  borderColor="messenger.700"
                  color="white"
                  _active={{
                    bg: "messenger.500",
                  }}
                  children="+"
                />
                <NumberDecrementStepper
                  borderColor="messenger.700"
                  children="-"
                  color="white"
                  _active={{
                    bg: "pink.500",
                  }}
                />
              </NumberInputStepper>
            </NumberInput>
          </FormLabel>
        </FormControl>
        <ButtonGroup
          size="sm"
          variant="outline"
          orientation="vertical"
          gap={2}
          w="full"
          mb={4}
          alignItems="center"
        >
          <Button
            colorScheme="pink"
            w="95%"
            fontSize="14px"
            _hover={{ backgroundColor: "#ffffff0f" }}
            onClick={() => handleGenerate54Comodin()}
          >
            Generar 54 comodines
          </Button>
          <Button
            colorScheme="pink"
            w="95%"
            fontSize="14px"
            _hover={{ backgroundColor: "#ffffff0f" }}
            onClick={() => handleGenerate54Comodin(true)}
          >
            Generar 54 comodines dobles
          </Button>
        </ButtonGroup>
        <ButtonGroup
          size="sm"
          variant="outline"
          flexWrap="wrap"
          orientation="vertical"
          gap={2}
          w="full"
          colorScheme="green"
          alignItems="center"
        >
          <Tooltip
            placement="right"
            hasArrow
            label="Hover me"
          >
            <Button
              _hover={{ backgroundColor: "#ffffff0f" }}
              w="95%"
              onClick={nSetsModal.onOpen}
            >
              <span>Generar sets de n</span>
            </Button>
          </Tooltip>
          <Tooltip
            placement="right"
            hasArrow
            label="Genera n tablas en pares de 2 y las 4 figuras del centro las usa en las esquinas de la siguiente tabla."
          >
            <Button
              _hover={{ backgroundColor: "#ffffff0f" }}
              w="95%"
              onClick={() => {
                openAlgoritmCEModal();
              }}
            >
              <span>Algoritmo CE</span>
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Box>
      {NSetsModalUI}
    </Flex>
  );
};
