import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFeaturesStore } from "../../../store/features";
import { Feature } from "../../../constants/types";
import { useFigureStore } from "../../../store/figures";
import {
  generateRandomMatrix,
  getRandom,
} from "../../../features/tables/generateRandomMatrix";
import { useTablesStore } from "../../../store/tables";
import { Table } from "../../types";
import { useImagesStore } from "../../../store/images";
import { generateTableImage } from "../../../features/images/generateTableImage";

export const StandardGenerateTool = () => {
  const features = useFeaturesStore(
    (state) => state.features
  );
  const setFeatures = useFeaturesStore(
    (state) => state.setFeatures
  );
  const figures = useFigureStore((state) => state.figures);

  const setTables = useTablesStore(
    (state) => state.setTables
  );
  const tables = useTablesStore((state) => state.tables);

  const handleConfig = (featureId: number) => {
    const actived = features.find((f) => f.id === featureId)
      ?.selected;
    const newFeatures = features.map((f) => {
      if (f.id === featureId) {
        return {
          ...f,
          selected: !actived,
        };
      }
      return f;
    });

    setFeatures(newFeatures);
  };
  const addImage = useImagesStore(
    (state) => state.addImage
  );
  const addImagesToStore = async (table: Table) => {
    await generateTableImage(table).then((image) => {
      addImage(image.toDataURL("image/jpeg", 0.5));
    });
  };

  const handleGenerate = () => {
    const sizeInput = document.getElementById(
      "sizeInput"
    ) as HTMLInputElement;
    const cantidadInput = document.getElementById(
      "cantidadTablasInput"
    ) as HTMLInputElement;
    const comodinInput = document.getElementById(
      "comodinInput"
    ) as HTMLSelectElement;
    const withComodin =
      comodinInput?.getAttribute("disabled") === null;

    const comodin = Number(comodinInput?.value);
    const size = Number(sizeInput?.value);
    const cantidad = Number(cantidadInput?.value);
    // console.log(withComodin);
    console.log({
      q: cantidad,
      size: size,
      comodin: withComodin ? comodin : 0,
    });

    const localTables: Table[] = [];
    let lastTableIndex = 0;
    if (tables[0]) {
      lastTableIndex = tables[tables.length - 1].id + 1;
    }

    for (let i = 0; i < cantidad; i++) {
      let matrix = generateRandomMatrix(
        size,
        1,
        54,
        withComodin ? comodin : 0
      );
      if (withComodin) {
        matrix = putComodinIntoTable(matrix, comodin);
        console.log(matrix);
      }
      const t: Table = {
        id: lastTableIndex,
        name: `Table${lastTableIndex}`,
        numbers: matrix,
        date: new Date().toISOString(),
        size: size,
      };

      localTables.push(t);
      addImagesToStore(t);

      lastTableIndex++;
    }

    setTables(localTables);
    console.log(tables);
  };

  const putComodinIntoTable = (
    table: number[][],
    comodin: number
  ): number[][] => {
    const centerFeature = features.find(
      (feature) => feature.name === "Centro"
    );
    const edgeFeature = features.find(
      (feature) => feature.name === "Esquinas"
    );
    // const cornerFeature = features.find(
    //   (feature) => feature.name === "Bordes"
    // );

    if (centerFeature && edgeFeature) {
      const inCenter = centerFeature.selected;
      const inEdges = edgeFeature.selected;
      // const inCorners = cornerFeature.selected;

      if (inCenter && inEdges) {
        let t = table;
        t = putComodinInCenter(t, comodin);
        t = putComodinInEdge(t, comodin);
        return t;
      } else if (inCenter) {
        return putComodinInCenter(table, comodin);
      } else if (inEdges) {
        return putComodinInEdge(table, comodin);
      } else {
        return putComodinRandomly(table, comodin);
      }
    }

    return table;
  };

  const putComodinRandomly = (
    table: number[][],
    comodin: number
  ): number[][] => {
    const tableWithComodin = table;
    const randomPlace = (): { x: number; y: number } => {
      const row: number = getRandom(
        0,
        tableWithComodin.length - 1
      );
      const column: number = getRandom(
        0,
        tableWithComodin.length - 1
      );
      return { x: row, y: column };
    };
    const place: { x: number; y: number } = randomPlace();
    tableWithComodin[place.x][place.y] = comodin;
    return tableWithComodin;
  };

  const putComodinInCenter = (
    table: number[][],
    comodin: number
  ): number[][] => {
    const tableWithComodin = table;
    const figuresInCenter = (table.length - 2) ** 2;
    const randomPlace = {
      x: getRandom(1, tableWithComodin.length - 2),
      y: getRandom(1, tableWithComodin.length - 2),
    };
    console.log(randomPlace);
    let setted: boolean;
    //TODO 1<= row * column <= figuresInCenter
    tableWithComodin.forEach((row) => {
      row.forEach((column) => {
        const place = {
          x: tableWithComodin.indexOf(row),
          y: row.indexOf(column),
        };
        console.log(place);
        console.log(randomPlace);
        console.log(row, column);
        const x = tableWithComodin.indexOf(row);
        const y = row.indexOf(column);
        console.log({ x: x, y: y });
        if (
          1 <= x &&
          x <= tableWithComodin.length - 2 &&
          1 <= y &&
          y <= tableWithComodin.length - 2
        ) {
          if (
            place.x == randomPlace.x &&
            place.y == randomPlace.y &&
            !setted
          ) {
            setted = true;
            tableWithComodin[x][y] = comodin as number;
            console.log(x, y);
            console.log(tableWithComodin);
          }
        }
      });
    });
    console.log(figuresInCenter);
    return tableWithComodin;
  };
  const putComodinInEdge = (
    table: number[][],
    comodin: number
  ): number[][] => {
    const tableWithComodin = table;
    const edges = [
      { x: 0, y: 0 },
      { x: 0, y: tableWithComodin.length - 1 },
      { x: tableWithComodin.length - 1, y: 0 },
      {
        x: tableWithComodin.length - 1,
        y: tableWithComodin.length - 1,
      },
    ];
    const randomEdge = (): { x: number; y: number } => {
      const rand = Math.floor(Math.random() * 4);
      console.log(rand);
      return edges[rand];
    };

    const edge: { x: number; y: number } = randomEdge();
    console.log(edge);
    tableWithComodin[edge.x][edge.y] = comodin;
    console.log(tableWithComodin);

    return tableWithComodin;
  };

  const handleDisabled = (f: Feature): boolean => {
    const dependency = features.find(
      (feature) => feature.id === f.conditionId
    );
    if (dependency) {
      if (dependency.selected) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  };

  const handleComodinSelectDisable = (): boolean => {
    const comodinSelected = features?.find(
      (f) => f.name === "Comodin"
    )?.selected;
    const dobleComodinSelected = features?.find(
      (f) => f.name === "Doble comodin"
    )?.selected;
    console.log(comodinSelected);
    console.log(dobleComodinSelected);
    console.log(comodinSelected || dobleComodinSelected);
    return !(comodinSelected || dobleComodinSelected);
  };
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
          Configuraciones
        </Text>
        <CheckboxGroup
          colorScheme="green"
          defaultValue={features
            .filter((feature) => feature.selected)
            .map((feature) => feature.name)}
        >
          <Stack
            spacing={[1, 2]}
            direction={["column", "row"]}
            flexWrap="wrap"
          >
            {features.map((feature) => {
              const disabled: boolean = handleDisabled(
                feature
              );
              return (
                <Checkbox
                  key={feature.id}
                  value={feature.name}
                  onChange={() => handleConfig(feature.id)}
                  colorScheme={
                    disabled ? "pink" : "messenger"
                  }
                  textColor={
                    disabled
                      ? "pink.500"
                      : feature.selected
                      ? "messenger.500"
                      : "messenger.700"
                  }
                  disabled={disabled}
                >
                  {feature.name}
                </Checkbox>
              );
            })}
          </Stack>
        </CheckboxGroup>
      </Box>

      <FormControl as="form">
        <FormLabel fontSize={16}>
          Cantidad de tablas
          <NumberInput
            size="sm"
            variant="outline"
            defaultValue={1}
            min={1}
          >
            <NumberInputField
              id="cantidadTablasInput"
              placeholder="25"
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
        <FormLabel fontSize={16}>
          Columnas y Filas
          <NumberInput
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
        <FormLabel fontSize={16}>
          Comodin
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
            disabled={handleComodinSelectDisable()}
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
        </FormLabel>
        <Button
          mt={4}
          size="sm"
          w="calc(100% - 12px)"
          variant="outline"
          colorScheme="messenger"
          onClick={handleGenerate}
        >
          Generar
        </Button>
      </FormControl>
    </Flex>
  );
};
