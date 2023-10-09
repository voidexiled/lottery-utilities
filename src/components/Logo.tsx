import {
  Box,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <Box
      as={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Text
        as="h1"
        fontSize="2xl"
        fontWeight="semibold"
      >
        Void Lottery
      </Text>
    </Box>
  );
};
