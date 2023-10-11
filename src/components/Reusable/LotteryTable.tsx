import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import { useFigureStore } from "../../store/figures";

import { motion } from "framer-motion";
import { Table } from "../types";
import { useModesStore } from "../../store/modes";
import { useTablesStore } from "../../store/tables";
import { useEffect, useState } from "react";

export const LotteryTable = ({
  ind,
  table,
  thumb,
}: {
  ind: string;
  table: Table;
  thumb?: boolean;
}) => {
  const selectedTable = useTablesStore(
    (state) => state.selectedTable
  );
  const removeTable = useTablesStore(
    (state) => state.removeTable
  );
  const tables = useTablesStore((state) => state.tables);
  const setSelectedTable = useTablesStore(
    (state) => state.setSelectedTable
  );

  const setMode = useModesStore((state) => state.setMode);
  const modes = useModesStore((state) => state.modes);
  const figures = useFigureStore(
    (state) => state.fullFigures
  );
  const getFigure = useFigureStore((state) => state.figure);

  const [localTable, setLocalTable] = useState(
    selectedTable
  );

  const baseTableSize = 200;
  const mdTableSize = 220;
  const lgTableSize = 240;
  const xlTableSize = 260;
  const xxlTableSize = 280;
  const xxxlTableSize = 340;

  const multiplier = 1.584358974358974;

  useEffect(() => {
    if (selectedTable) {
      setLocalTable(selectedTable);
    }

    return () => {
      setLocalTable(selectedTable);
    };
  }, [selectedTable]);

  if (thumb) {
    return (
      <Box
        as={motion.li}
        key={ind}
        w={{
          base: baseTableSize,
          md: mdTableSize,
          lg: lgTableSize,
          xl: xlTableSize,
          "2xl": xxlTableSize,
        }}
        h={{
          base: baseTableSize * multiplier,
          md: mdTableSize * multiplier,
          lg: lgTableSize * multiplier,
          xl: xlTableSize * multiplier,
          "2xl": xxlTableSize * multiplier,
        }}
        overflow="hidden"
        m="auto"
        rounded="lg"
        initial={{
          scale: "0.95",
          borderCollapse: "collapse",
          border: "none",
        }}
        whileHover={{
          cursor: "pointer",
          scale: "1",
          border: [
            "3px solid #f00a",
            "3px solid #0f0a",
            "3px solid #00fa",
            "3px solid #ff0a",
            "3px solid #0ffa",
            "3px solid #f0fa",
            "3px solid #fffa",
          ],
          transition: {
            duration: 3,
            repeat: Infinity,
          },
        }}
        transition="0.15s ease-out"
        boxSizing="border-box"
        onContextMenu={(
          e: React.MouseEvent<HTMLLIElement>
        ) => {
          e.preventDefault();
          if (e.button == 2) {
            console.log("RightClick");
            console.log(table);
            console.log(table.id);
            removeTable(table.id);
          }
        }}
        onClick={() => {
          setMode(modes.SINGLE_MODE);
          setSelectedTable(table);
        }}
      >
        <SimpleGrid
          as="ul"
          bg="blue.200"
          columns={table.size}
          autoRows={`calc(100% / ${table.size})`}
          w="full"
          h="full"
          boxSizing="border-box"
        >
          {table.numbers
            .flat()
            .map((number: number, index: number) => {
              const figure = figures.find(
                (fig) => fig.id === number
              );
              const imageSrc = figure?.src.split("/");
              const img = imageSrc?.pop();
              if (imageSrc && img) {
                imageSrc?.push("thumb");
                imageSrc?.push(img);
              }
              const finalSrc = imageSrc?.join("/");

              return (
                <Image
                  key={`${index}`}
                  src={figure?.src}
                  alt={figure?.name}
                  objectFit="cover"
                  border="1px solid black"
                  w="full"
                  h="full"
                  draggable="false"
                  loading="lazy"
                  sx={{ imageResolution: "80dpi" }}
                />
              );
            })}
        </SimpleGrid>
      </Box>
    );
  }
  if (selectedTable) {
    return (
      <Box
        as={motion.li}
        key={ind}
        w={{
          base: lgTableSize,
          xl: xxxlTableSize,
        }}
        h={{
          base: lgTableSize * multiplier,
          xl: xxxlTableSize * multiplier,
        }}
        overflow="hidden"
        m="auto"
        rounded="lg"
        boxSizing="border-box"
      >
        <SimpleGrid
          as="ul"
          bg="blue.200"
          columns={table.size}
          autoRows={`calc(100% / ${table.size})`}
          w="full"
          h="full"
          boxSizing="border-box"
        >
          {localTable?.numbers
            .flat()
            .map((number: number, index: number) => {
              const figure = figures.find(
                (fig) => fig.id === number
              );
              const imageSrc = figure?.src.split("/");
              const img = imageSrc?.pop();
              if (imageSrc && img) {
                imageSrc?.push("thumb");
                imageSrc?.push(img);
              }
              const finalSrc = imageSrc?.join("/");
              const flatId = index;

              const pKey = `${selectedTable.id}-${index}`;
              console.info(pKey);
              return (
                <Image
                  as={motion.img}
                  key={pKey}
                  src={figure?.src}
                  alt={figure?.name}
                  objectFit="cover"
                  border="1px solid black"
                  w="full"
                  h="full"
                  draggable="false"
                  loading="lazy"
                  // initial={{
                  //   filter: "grayscale(0)",
                  //   border: "1px solid #000",
                  // }}
                  // whileHover={{
                  //   filter: "grayscale(0.4)",
                  //   cursor: "pointer",
                  //   border: "2px solid blue",
                  // }}
                  initial={{
                    border: "1px solid #000",
                    filter: "grayscale(0) brightness(1)",
                  }}
                  whileHover={{
                    cursor: "pointer",

                    border: [
                      "3px solid #f00a",
                      "3px solid #0f0a",
                      "3px solid #00fa",
                      "3px solid #ff0a",
                      "3px solid #0ffa",
                      "3px solid #f0fa",
                      "3px solid #fffa",
                    ],
                    filter: [
                      "grayscale(0) brightness(1)",
                      "grayscale(0.5) brightness(1.25)",
                      "grayscale(0.1) brightness(1.5)",
                      "grayscale(0.5) brightness(1.25)",
                      "grayscale(0), brightness(1)",
                    ],

                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                    },
                  }}
                  transition="0.15s ease-out"
                  onClick={() => {
                    const row = Math.floor(
                      flatId / localTable.size
                    );
                    const index = Math.ceil(
                      flatId % localTable.size
                    );
                    if (figure) {
                      const oldNumbers = localTable.numbers;
                      oldNumbers[row][index] = getFigure.id;
                      console.log(row, index);
                      console.log(getFigure.id);
                      setLocalTable({
                        ...localTable,
                        numbers: oldNumbers,
                      });
                      console.log(tables);
                    }
                  }}
                />
              );
            })}
        </SimpleGrid>
      </Box>
    );
  }
};
