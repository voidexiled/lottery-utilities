import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useFigureStore } from "../../store/figures";

import { motion } from "framer-motion";

import { useModesStore } from "../../store/modes";
import { useTablesStore } from "../../store/tables";
import { memo, useEffect, useState } from "react";
import { Table } from "../../store/types";
import { getURLImage } from "../../features/images/generateTableImage";
import { useComodinStore } from "../../store/comodin";
export const LotteryTable = memo(({
  ind,
  table,
  thumb,
}: {
  ind: string;
  table: Table;
  thumb?: boolean;
}) => {
  const { comodin } = useComodinStore((state) => state);
  const { tables, selectedTable, setSelectedTable, removeTable } = useTablesStore((state) => state);
  const { modes, setMode } = useModesStore((state) => state);
  const { fullFigures, figure: getFigure } = useFigureStore((state) => state);


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
    //}, [selectedTable, localTable, setTable]);
  }, [selectedTable]);
  const getFigureName = (id?: number): string => {
    if (id) {
      const figure = fullFigures.find((f) => f.id === id);
      if (figure) {
        return figure.name;
      }
    }
    return "";
  }

  if (thumb) {
    return (
      <Box
        id={(table.id as unknown) as string}
        as={motion.li}
        key={ind}
        className="thumb"
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
          scale: "1",
          borderCollapse: "collapse",
          border: "none",
        }}
        whileHover={{
          cursor: "pointer",
          scale: "1.05",
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
        onTouchMove={(e: React.TouchEvent<HTMLLIElement>) => {
          // Agregar lógica para manejar el evento táctil en dispositivos móviles
          console.log(e)
          e.preventDefault();
          console.log("TouchStart");
          console.log(table);
          console.log(table.id);
          removeTable(table.id);
        }}
        onTouchEnd={(e: React.TouchEvent<HTMLLIElement>) => {
          console.log(e)
        }}
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
        <Box position="absolute" width="full" height="full" background={"rgba(0,0,0,0.7)"} opacity={0}
          transition={"0.2s ease-out"}
          display="grid"
          gridTemplateColumns="1fr"
          gridTemplateRows="40px 40px 40px 40px 40px"
          p={4}
          gap={3}
          color="#fff"
          _hover={{
            opacity: 1,

          }}
        >
          <Text>#{table.id}</Text>
          <Text>{table.name}</Text>
          <Text>{table.date}</Text>
          <Text>{table.size}x{table.size}</Text>
          <Text>{getFigureName(table.comodin)}</Text>
        </Box>


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
              const figure = fullFigures.find(
                (fig) => fig.id === number
              );
              const imageSrc = figure?.src.split("/");
              const img = imageSrc?.pop();
              if (imageSrc && img) {
                imageSrc?.push("thumb");
                imageSrc?.push(img);
              }

              //const finalSrc = imageSrc?.join("/");
              let eSrc = figure?.src;
              const figureCustom: boolean = fullFigures.find(f => f.id === figure?.id) == null;
              if (figureCustom) {
                eSrc = comodin.WEBPDataURL;
              }
              return (
                <Image
                  key={`${index}`}
                  src={eSrc}
                  alt={figure?.name}
                  objectFit="cover"
                  border="1px solid black"
                  w="full"
                  h="full"
                  draggable="false"
                  loading="lazy"
                  sx={{
                    imageResolution: "80dpi",
                  }}
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
        id={(selectedTable.id as unknown) as string}
        as={motion.li}
        key={ind}
        w={{
          base: baseTableSize,
          md: lgTableSize,
          xl: xxxlTableSize,
        }}
        h={{
          base: baseTableSize * multiplier,
          md: lgTableSize * multiplier,
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
              const figure = fullFigures.find(
                (fig) => fig.id === number
              );
              const imageSrc = figure?.src.split("/");
              // const img = imageSrc
              //   ?.pop()

              // if (imageSrc && img) {
              //   imageSrc.pop();
              //   imageSrc.push(img);
              // }
              const finalSrc = imageSrc?.join("/");
              const flatId = index;

              const pKey = `${selectedTable.id}-${index}`;
              console.info(pKey);

              let eSrc = finalSrc;
              const figureCustom: boolean = fullFigures.find(f => f.id === figure?.id) == null;
              if (figureCustom) {
                eSrc = comodin.WEBPDataURL;
              }

              return (
                <Image
                  as={motion.img}
                  key={pKey}
                  src={eSrc}
                  alt={figure?.name}
                  objectFit="cover"
                  w="full"
                  h="full"
                  draggable="false"
                  loading="lazy"
                  sx={{
                    border: "0.25px solid #000",
                  }}
                  initial={{
                    border: "1px solid #000",
                    filter: "grayscale(0) brightness(1) ",
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
                  onClick={async () => {
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

                      selectedTable.dataURL = await getURLImage(localTable.numbers, localTable.size, comodin);
                      selectedTable.numbers = localTable.numbers;
                    }
                  }}
                />
              );
            })}
        </SimpleGrid>
      </Box>
    );
  }
});

