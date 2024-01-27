import {
  Box,
  Button,
  ButtonGroup,

  Flex,
  FormControl,
  FormLabel,

  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,

  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

import SetsN from "./SetsN/SetsN";
import Comodin from "./Comodin/Comodin";

const TABLESIZES = [
  {
    name: "4x4",
    centerPositions: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
    edgePositions: [
      { x: 0, y: 0 },
      { x: 0, y: 3 },
      { x: 3, y: 0 },
      { x: 3, y: 3 },
    ],
  },
  {
    name: "5x5",
    centerPositions: [
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 3 },
      { x: 3, y: 3 },
    ],
    edgePositions: [
      { x: 0, y: 0 },
      { x: 0, y: 3 },
      { x: 3, y: 0 },
      { x: 3, y: 3 },
    ],
  },
];
// TODO: USE TABLESIZES TO CENTER AND EDGE POSITIONS
console.log(TABLESIZES);

export const MultipleGeneratorTool = () => {

  const nSetsModal = useDisclosure();
  const comodinModal = useDisclosure();



  //TODO: CONVERTIR A USEDISCLOSURE CON INITIAL REF Y FINAL REF
  const openAlgoritmCEModal = () => {
    return;
  };

  /* TODO: 
  const handleGenerateSetTablas = () => {
    const comodin = Number(
      (document.getElementById("comodinInput") as HTMLInputElement).value
    );
    const size = Number(
      (document.getElementById("sizeInput") as HTMLInputElement).value
    );
    const qyTables = Number(
      (document.getElementById("cantidadTablasInput") as HTMLInputElement).value
    );

    const localTables = generateTables(comodin, size, qyTables);

    saveTables(localTables);
  };

  const generateTables = (comodin: number, size: number, qyTables: number) => {
    const localTables = [];
    const oldArray: Figure[] = [...figures];
    const comodinFigure = figures.find((f) => f.id === comodin) as Figure;
    const minLengthArray = calculateMinLengthArray(size);

    let maxNum = 0;
    let minNum = 1;
    let lastTableIndex = getLastTableIndex();

    for (let i = 0; i < qyTables; i++) {
      if (oldArray.length < minLengthArray) {
        const restantes = 54 - oldArray.length;
        updateMinMaxNum(oldArray, maxNum, minNum);

        for (let y = 0; y < restantes; y++) {
          maxNum += 1;
          if (maxNum > 54) {
            maxNum = 1;
          }

          const nextFig = figures.find((fig) => fig.id === maxNum);

          if (nextFig) {
            oldArray.push(nextFig);
          }
        }
      }

      const tempArray: Figure[] = getTempArray(oldArray, minLengthArray);
      const unsortedArray: Figure[] = shuffleArray(tempArray);
      const numbersMatrix = unsortedArray.map((f) => f.id);
      const newArray: number[][] = createNewArray(numbersMatrix, size);

      const table: Table = {
        id: lastTableIndex,
        name: `Table${lastTableIndex}`,
        numbers: newArray,
        date: new Date().toISOString(),
        size: size,
      };

      localTables.push(table);
      lastTableIndex += 1;
    }

    return localTables;
  };

  const calculateMinLengthArray = (size: number) => {
    let minLengthArray = size * size;
    if (!withoutComodin) {
      minLengthArray -= 1;
    }
    return minLengthArray;
  };

  const updateMinMaxNum = (oldArray: Figure[], maxNum: number, minNum: number) => {
    oldArray.map((f) => {
      if (f.id > maxNum) {
        maxNum = f.id;
      }
      if (f.id < minNum) {
        minNum = f.id;
      }
    });
  };

  const getLastTableIndex = () => {
    let lastTableIndex = 0;
    if (tables[0]) {
      lastTableIndex = tables[tables.length - 1].id + 1;
    }
    return lastTableIndex;
  };

  const getTempArray = (oldArray: Figure[], minLengthArray: number) => {
    const tempArray: Figure[] = [];
    for (let item = 0; item < minLengthArray; item++) {
      const fig = oldArray.shift();
      if (fig) {
        tempArray.push(fig);
      }
    }
    return tempArray;
  };

  const createNewArray = (numbersMatrix: number[], size: number) => {
    const newArray: number[][] = [];
    for (let i = 0; i < numbersMatrix.length; i += size) {
      const subarray: number[] = numbersMatrix.slice(i, i + size);
      newArray.push(subarray);
    }
    return newArray;
  };

  const saveTables = (localTables: Table[]) => {
    setTables(localTables);
    console.log(localTables);
  };

  */

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
              size="sm"
              variant="outline"
              defaultValue={4}
              min={3}
              max={5}
              id="sizeInput"
            >
              <NumberInputField
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
          <Tooltip
            placement="right"
            hasArrow
            label="Genera 54 tablas con comodin."
          >
            <Button
              colorScheme="pink"
              w="95%"
              fontSize="14px"
              _hover={{ backgroundColor: "#ffffff0f" }}
              onClick={comodinModal.onOpen}
            >
              Generar 54 comodines
            </Button>
          </Tooltip>
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
            label="Genera n tablas de forma que las todas las tablas utilicen las 54 figuras."
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
            label="Genera n tablas en pares de 2 y, las 4 figuras del centro las usa en las esquinas de la siguiente tabla."
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
      <SetsN disclose={nSetsModal} />
      <Comodin disclose={comodinModal} />
    </Flex>
  );
};
