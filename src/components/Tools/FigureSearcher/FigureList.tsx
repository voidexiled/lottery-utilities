import { Box, Card, Grid, Image } from "@chakra-ui/react";
import { useFigureStore } from "../../../store/figures";
import { AnimatePresence, motion } from "framer-motion";

export const FigureList = () => {

  const { figures, setFigure } = useFigureStore((state) => state);

  const figuresToList = [...figures];

  return (
    <Box
      p={4}
      as={motion.section}
      border="1px solid rgba(255,255,255,0.3)"
      rounded="md"
      textColor={"var(--light)"}
    >
      <Grid
        as="ul"
        textColor={"var(--light)"}
        gridTemplateColumns={{
          base: "1fr",
          lg: "1fr 1fr"
        }}
        overflowY="scroll"
        maxH="calc(100vh - 150px - 80px)"
        className="thegrid"
      >
        {figuresToList.map((figure, index) =>
          index < 20 ? (
            <AnimatePresence key={figure.id}>
              <Card
                as={motion.li}
                bg="none"
                w="full"
                p={2}
                transition="0.15s"
                rounded="lg"
                initial={{
                  opacity: 0,
                  filter: "saturate(1)",
                }}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  cursor: "pointer",
                  filter: "saturate(0.6)",
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                onClick={() => {
                  setFigure(figure);
                  console.info(figure);
                }}
              >
                <Image
                  as={motion.img}
                  src={figure.src}
                  h="100%"
                  w="auto"
                  objectFit="contain"
                  rounded="md"
                />
              </Card>
            </AnimatePresence>
          ) : null
        )}
      </Grid>
    </Box>
  );
};
