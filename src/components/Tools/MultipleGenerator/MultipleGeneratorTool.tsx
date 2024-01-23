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
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useFigureStore } from "../../../store/figures";
import { useTablesStore } from "../../../store/tables";
import { Figure, Table } from "../../../store/types";
import {

  shuffleArray,
} from "../../../features/tables/generateRandomMatrix";
import { getURLImage } from "../../../features/images/generateTableImage";

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
console.log(TABLESIZES);

export const MultipleGeneratorTool = () => {
  const toast = useToast();
  const { tables, setTables } = useTablesStore((state) => state);

  const { figures } = useFigureStore(
    (state) => state
  );
  const nSetsModal = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [withoutComodin, setWithoutComodin] = useState(
    true
  );

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
  /**
   * Función que se encarga de generar conjuntos de tablas.
   * Obtiene los valores de los inputs de comodín, tamaño y cantidad de tablas.
   * Genera las tablas utilizando la función generateTables.
   * Guarda las tablas generadas utilizando la función saveTables.
   */
  const handleGenerateSetTablas = async () => {
    const comodin = Number(
      (document.getElementById("comodinInput") as HTMLInputElement).value
    );
    const size = Number(
      (document.getElementById("sizeInput") as HTMLInputElement).value
    );
    const qyTables = Number(
      (document.getElementById("cantidadTablasInput") as HTMLInputElement).value
    );

    const localTables = await generateTables(comodin, size, qyTables).then((res) => {
      return res;
    });

    saveTables(localTables);
  };

  /**
   * Función que genera las tablas.
   * Recibe los valores de comodín, tamaño y cantidad de tablas.
   * Genera las tablas utilizando los valores recibidos y otras funciones auxiliares.
   * Retorna un array con las tablas generadas.
   * @param comodin El valor del comodín.
   * @param size El tamaño de las tablas.
   * @param qyTables La cantidad de tablas a generar.
   * @returns Un array con las tablas generadas.
   */
  const generateTables = async (comodin: number, size: number, qyTables: number) => {
    const localTables = [];
    const oldArray: Figure[] = [...figures];
    const comodinFigure = figures.find((f) => f.id === comodin) as Figure;
    const minLengthArray = calculateMinLengthArray(size);
    console.log(comodinFigure); // TODO: insertar comodin en las tablas.
    let maxNum = 0;
    const minNum = 1;
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
        dataURL: await getURLImage(newArray, size),
      };

      localTables.push(table);
      lastTableIndex += 1;
    }

    return localTables;
  };

  /**
   * Función que calcula la longitud mínima del array.
   * Recibe el tamaño de las tablas.
   * Si el comodín está habilitado, se resta 1 a la longitud mínima.
   * @param size El tamaño de las tablas.
   * @returns La longitud mínima del array.
   */
  const calculateMinLengthArray = (size: number) => {
    let minLengthArray = size * size;
    if (!withoutComodin) {
      minLengthArray -= 1;
    }
    return minLengthArray;
  };

  /**
   * Función que actualiza los valores máximo y mínimo del array.
   * Recibe el array de figuras, el valor máximo y el valor mínimo.
   * Actualiza los valores máximo y mínimo en base a las figuras del array.
   * @param oldArray El array de figuras.
   * @param maxNum El valor máximo actual.
   * @param minNum El valor mínimo actual.
   */
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

  /**
   * Función que obtiene el índice de la última tabla.
   * Si hay tablas en el array, retorna el índice de la última tabla más 1.
   * @returns El índice de la última tabla.
   */
  const getLastTableIndex = () => {
    let lastTableIndex = 0;
    if (tables[0]) {
      lastTableIndex = tables[tables.length - 1].id + 1;
    }
    return lastTableIndex;
  };

  /**
   * Función que obtiene un array temporal a partir del array original.
   * Recibe el array original y la longitud mínima del array.
   * Obtiene un subconjunto del array original con la longitud mínima.
   * @param oldArray El array original.
   * @param minLengthArray La longitud mínima del array.
   * @returns Un array temporal con la longitud mínima.
   */
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

  /**
   * Función que crea un nuevo array a partir de una matriz de números y un tamaño.
   * Recibe la matriz de números y el tamaño de los subarrays.
   * Crea un nuevo array dividiendo la matriz en subarrays del tamaño especificado.
   * @param numbersMatrix La matriz de números.
   * @param size El tamaño de los subarrays.
   * @returns Un nuevo array con los subarrays creados.
   */
  const createNewArray = (numbersMatrix: number[], size: number) => {
    const newArray: number[][] = [];
    for (let i = 0; i < numbersMatrix.length; i += size) {
      const subarray: number[] = numbersMatrix.slice(i, i + size);
      newArray.push(subarray);
    }
    return newArray;
  };

  /**
   * Función que guarda las tablas generadas.
   * Recibe un array con las tablas generadas y las guarda en el estado.
   * @param localTables El array con las tablas generadas.
   */
  const saveTables = (localTables: Table[]) => {
    setTables(localTables);
    console.log(localTables);
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

  const NSetsModalUI = (
    <Modal
      isOpen={nSetsModal.isOpen}
      onClose={nSetsModal.onClose}
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
      <ModalContent
        bgColor="var(--night)"
        textColor="var(--light)"
      >
        <ModalHeader fontSize={{ base: "18px" }}>
          Generar set de tablas
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>
              <Checkbox
                size="sm"
                checked={withoutComodin}
                onChange={() => {
                  setWithoutComodin(!withoutComodin);
                }}
              >
                Comodin
              </Checkbox>
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
            <FormLabel fontSize={{ base: "16px" }}>
              Cantidad de tablas:
            </FormLabel>
            <NumberInput
              id="cantidadTablasInput"
              size="sm"
              variant="outline"
              defaultValue={1}
              min={1}
              max={150}
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
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            size="sm"
            onClick={() => {
              const res = handleGenerateSetTablas();

              toast.promise(res, {
                loading: { title: "Generando tablas...", description: "Espera un momento..." },
                success: { title: "Tablas generadas!", description: "Se han generado correctamente", duration: 700, isClosable: true },
                error: { title: "Error al generar", description: "Ha ocurrido un error.", duration: 2000, isClosable: true },
              })
            }}
          >
            Generar
          </Button>
          <Button onClick={nSetsModal.onClose} size="sm">
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
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
