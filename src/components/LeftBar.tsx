import { Box } from "@chakra-ui/react";
import { Tool } from "./Tool";

export const LeftBar = () => {
  return (
    <Box
      as="aside"
      h="full"
      sx={{
        background: "var(--night)",
      }}
      borderRight={
        "1px solid rgba(255,255,255,0.3)"
      }
      pl={12}
      pr={6}
      py={4}
    >
      <Tool></Tool>
    </Box>
  );
};
