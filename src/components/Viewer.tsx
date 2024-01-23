import { Box, Button, SimpleGrid } from "@chakra-ui/react";

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
import { generateTableImage } from "../features/images/generateTableImage";
import { useEffect, useState } from "react";


export const Viewer = () => {
  const [previousTableIdSelected, setPreviousTableIdSelected] = useState(0);
  const modes = useModesStore((state) => state.modes);
  const setMode = useModesStore((state) => state.setMode);
  const mode = useModesStore((state) => state.mode);
  const tables = useTablesStore((state) => state.tables);
  const selectedTable = useTablesStore(
    (state) => state.selectedTable
  );
  const setSelectedTable = useTablesStore(
    (state) => state.setSelectedTable
  );

  useEffect(() => {
    if (selectedTable && mode === modes.SINGLE_MODE) {
      setPreviousTableIdSelected(selectedTable.id);


    } else {
      if (tables.length > 0) {
        const element = document.getElementById(`${previousTableIdSelected}`);
        console.warn(element)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // ANIMACION DE QUE SE SCROLLEO HACIA ESE ELEMENTO EN ESPECIFICO
          // REMARCAR LA TABLA A LA QUE SE REGRESÓ
        }
      }
    }

  }
  , [selectedTable])

  const handleDownload = async () => {
    console.log("downloading");
    if (selectedTable) {
      await generateTableImage(selectedTable).then(
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
              justifyContent="space-between"
              alignItems="center"
              as={motion.span}
              p={4}
              
            >
              <Button background="none"
              _hover={{background: "#00000a"}}
               onClick={() => {
                const previousTable = tables.find((t) => t.id === selectedTable?.id as unknown as number - 1);
                if (previousTable) {
                  setSelectedTable(previousTable);
                }

              }}>
              <IconArrowLeft color="#fff"></IconArrowLeft></Button>
              <Button background="none"
              _hover={{background: "#00000a"}} onClick={() => {
                setMode(modes.FULL_MODE);
                setSelectedTable(null);

              }}>
                <IconMinimize color="#fff"></IconMinimize>
              </Button>
              <Button
              rightIcon={<IconDownload />}
              onClick={handleDownload}
            >
              Download
            </Button>
              <Button background="none"
              _hover={{background: "#00000a"}} onClick={() => {
                const nextTable = tables.find((t) => t.id === selectedTable?.id as unknown as number + 1);
                if (nextTable) {
                  setSelectedTable(nextTable);
                }
                

              }} >
                
                <IconArrowRight color="#fff"></IconArrowRight></Button>
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
