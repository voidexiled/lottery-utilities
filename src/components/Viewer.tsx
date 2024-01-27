import { Box, Button, SimpleGrid, Stack } from "@chakra-ui/react";

import { LotteryTable } from "./Reusable/LotteryTable";
import { useModesStore } from "../store/modes";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDownload,
  IconMinimize,
} from "@tabler/icons-react";
import { useTablesStore } from "../store/tables";
import { useEffect, useState } from "react";
import { generateTableImage } from "../features/images/generateTableImage";


export const Viewer = () => {
  const { mode, modes, setMode } = useModesStore((state) => state);
  const { tables, selectedTable, setSelectedTable } = useTablesStore((state) => state);
  const [previousTableIdSelected, setPreviousTableIdSelected] = useState(0);

  useEffect(() => {
    if (selectedTable && mode === modes.SINGLE_MODE) {
      setPreviousTableIdSelected(selectedTable.id);


    } else {
      if (tables.length > 0) {
        const element = document.getElementById(`${previousTableIdSelected}`);
        console.warn(element)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add("tableSelected");
          setTimeout(() => {
            element.classList.remove("tableSelected");
          }, 3000);
        }
      }
    }

  }
    , [selectedTable])
  const handleDownload = async () => {
    console.log("downloading");
    if (selectedTable) {
      await generateTableImage(selectedTable.numbers, selectedTable.size).then(
        (canvas) => {
          const url = canvas.toDataURL("image/jpeg", 0.5);
          const a = document.createElement("a");
          a.href = url;
          a.download = selectedTable.name + ".jpeg";
          a.click();
        }
      );
    }
  };
  return (
    <AnimatePresence>
      <Box
        w="full"
        h="full"
        bgColor="blackAlpha.900"
        position="relative"
        overflowY="scroll"
        overflowX="hidden"
        className="viewerGrid"
        id="viewerGrid"
      >

        {mode === modes.FULL_MODE && (

          <SimpleGrid
            as={motion.ul}
            position="relative"
            zIndex={2}
            w="full"
            h="full"
            columns={{ base: 1, lg: 2, xl: 3, "2xl": 4 }}
            spacing={{ base: 1, lg: 2, xl: 3, "2xl": 4 }}
            px={{ base: 4, lg: 16 }}
            py={{ base: 2, lg: 14 }}
            className="viewerGrid"
            initial={{
              opacity: 0,
              x: -1000,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.35,
                type: "spring",
              },
            }}
            exit={{
              x: 1000,
              opacity: 0,
            }}
          >
            {tables &&
              tables.map((t, index) => {
                console.log(t);
                return (
                  <LotteryTable
                    key={index}
                    ind={(t.id as unknown) as string}
                    table={t}
                    thumb
                  />
                );
              })}
          </SimpleGrid>
        )}
        {mode === modes.SINGLE_MODE && (
          <SimpleGrid
            as={motion.ul}
            position="relative"
            zIndex={2}
            w="full"
            h="full"
            columns={1}
            px={{ base: 4, lg: 16 }}
            py={{ base: 2, lg: 14 }}
            overflowY="hidden"
            initial={{
              opacity: 0,
              x: 1000,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.35,
                type: "spring",
                bounce: 0.25,
              },
            }}
            exit={{
              x: -1000,
              opacity: 0,
            }}
          >
            <Box
              position="absolute"
              display="flex"
              width="full"
              flexDir="column"
              alignItems="center"
              as={motion.span}
              p={4}
              gap={2}
            >
              <Stack w="full" direction="row" justifyContent="end">
                <Button
                  background="none"
                  color="#fff"
                  size="sm"
                  rightIcon={<IconDownload />}
                  _hover={{ background: "#00000a" }}
                  onClick={handleDownload}
                >
                  Download
                </Button>
                <Button size="sm" background="none" color={"#fff"}
                  rightIcon={<IconMinimize color="#fff"></IconMinimize>}
                  _hover={{ background: "#00000a" }}
                  onClick={() => {
                    setMode(modes.FULL_MODE);
                    setSelectedTable(null);

                  }}>
                  Minimizar
                </Button>
              </Stack>
              <Stack w="full" direction="row" justifyContent="space-between">
                <Button size="sm" background="none" color={selectedTable?.id === 0 ? "#555552" : "#fff"}
                  _hover={{ background: "#00000a" }}
                  onClick={() => {
                    const previousTable = tables.find((t) => t.id === selectedTable?.id as unknown as number - 1);
                    if (previousTable) {
                      setSelectedTable(previousTable);
                    }

                  }}>
                  <IconArrowLeft color={selectedTable?.id === 0 ? "#555552" : "#fff"}></IconArrowLeft>Anterior</Button>

                <Button size="sm" background="none" color={selectedTable?.id === tables.length - 1 ? "#555552" : "#fff"}
                  _hover={{ background: "#00000a" }} onClick={() => {
                    const nextTable = tables.find((t) => t.id === selectedTable?.id as unknown as number + 1);
                    if (nextTable) {
                      setSelectedTable(nextTable);
                    }


                  }} >

                  Siguiente<IconArrowRight color={selectedTable?.id === tables.length - 1 ? "#555552" : "#fff"}></IconArrowRight></Button>
              </Stack>

            </Box>

            {selectedTable ? (
              <LotteryTable
                key={
                  (selectedTable.id as unknown) as string
                }
                ind={
                  (selectedTable.id as unknown) as string
                }
                table={selectedTable}
              />
            ) : (
              <></>
            )}
          </SimpleGrid>
        )}
      </Box>
    </AnimatePresence>
  );
};
