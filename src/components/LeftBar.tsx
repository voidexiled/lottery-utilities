import { Box } from "@chakra-ui/react";
import { Tool } from "./Tool";

export const LeftBar = () => {
  return (
    <Box
      as="aside"
      h="full"
      position="relative"
      zIndex={3}
      sx={{
        background: "var(--night)",
      }}
      borderRight={"1px solid rgba(255,255,255,0.3)"}
      pl={{ base: 6, lg: 12 }}
      pr={{ base: 3, lg: 6 }}

      py={4}
    >
      <Tool></Tool>
    </Box>
  );
};
