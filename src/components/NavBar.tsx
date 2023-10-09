import {
  Box,
  Button,
} from "@chakra-ui/react";
import { IconListSearch } from "@tabler/icons-react";
import { Logo } from "./Logo";

export const NavBar = () => {
  return (
    <Box
      as="header"
      position="relative"
      zIndex={5}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      h={70}
      px="62px"
      textColor={"var(--light)"}
      sx={{
        background: "var(--night)",
      }}
      borderBottom={
        "1px solid rgba(255,255,255,0.3)"
      }
      boxShadow={
        "0 0 24px 2px rgba(0,0,0,0.20)"
      }
    >
      <Logo />
      <Box as="section">
        <Button
          size={"sm"}
          colorScheme="pink"
          rightIcon={<IconListSearch />}
        >
          Ver mis tablas
        </Button>
      </Box>
    </Box>
  );
};
