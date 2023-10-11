import { Box, SimpleGrid } from "@chakra-ui/react";

import { LotteryTable } from "./Reusable/LotteryTable";
import { useModesStore } from "../store/modes";
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTablesStore } from "../store/tables";

export const Viewer = () => {
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
              tables.reverse().map((t, index) => {
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
              as={motion.span}
              p={4}
              onClick={() => {
                setMode(modes.FULL_MODE);
                setSelectedTable(null);
              }}
            >
              <IconArrowLeft color="#fff"></IconArrowLeft>{" "}
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
