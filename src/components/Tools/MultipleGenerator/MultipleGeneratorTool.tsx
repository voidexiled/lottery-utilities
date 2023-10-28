import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

export const MultipleGeneratorTool = () => {
  const nSetsModal = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleGenerate54Comodin = (
    double?: boolean
  ): void => {
    if (!double) {
      console.log("No double");
    } else {
      console.log("Double");
    }
  };
  //TODO: CONVERTIR A USEDISCLOSURE CON INITIAL REF Y FINAL REF
  const openAlgoritmCEModal = () => {
    return;
  };

  const NSetsModalUI = (
    <Modal
      isOpen={nSetsModal.isOpen}
      onClose={nSetsModal.onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      colorScheme="messenger"
      size="md"
    >
      <ModalOverlay />
      <ModalContent
        bgColor="var(--night)"
        textColor="var(--light)"
      >
        -+
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input
              ref={initialRef}
              placeholder="First name"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Last name</FormLabel>
            <Input placeholder="Last name" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={nSetsModal.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Flex
      as="section"
      w="full"
      h="full"
      direction="column"
      color="rgba(255,255,255,0.72)"
    >
      <Box mb={8}>
        <Text
          w="full"
          fontWeight="medium"
          fontSize={20}
          mb={2}
        >
          Generador Multiple
        </Text>
      </Box>
      <Box mb={8}>
        <FormControl as="form" pb={4}>
          <FormLabel fontSize={16} w="full">
            Columnas y Filas
            <NumberInput
              size="sm"
              variant="outline"
              defaultValue={4}
              min={3}
              max={5}
            >
              <NumberInputField
                id="sizeInput"
                placeholder="4"
                borderColor="messenger.500"
                _focus={{
                  borderColor: "messenger.600",
                }}
                _hover={{
                  borderColor: "messenger.700",
                }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  borderColor="messenger.700"
                  color="white"
                  _active={{
                    bg: "messenger.500",
                  }}
                  children="+"
                />
                <NumberDecrementStepper
                  borderColor="messenger.700"
                  children="-"
                  color="white"
                  _active={{
                    bg: "pink.500",
                  }}
                />
              </NumberInputStepper>
            </NumberInput>
          </FormLabel>
        </FormControl>
        <ButtonGroup
          size="sm"
          variant="outline"
          orientation="vertical"
          gap={2}
          w="full"
          mb={4}
          alignItems="center"
        >
          <Button
            colorScheme="pink"
            w="95%"
            fontSize="14px"
            _hover={{ backgroundColor: "#ffffff0f" }}
            onClick={() => handleGenerate54Comodin()}
          >
            Generar 54 comodines
          </Button>
          <Button
            colorScheme="pink"
            w="95%"
            fontSize="14px"
            _hover={{ backgroundColor: "#ffffff0f" }}
            onClick={() => handleGenerate54Comodin(true)}
          >
            Generar 54 comodines dobles
          </Button>
        </ButtonGroup>
        <ButtonGroup
          size="sm"
          variant="outline"
          flexWrap="wrap"
          orientation="vertical"
          gap={2}
          w="full"
          colorScheme="green"
          alignItems="center"
        >
          <Tooltip
            placement="right"
            hasArrow
            label="Hover me"
          >
            <Button
              _hover={{ backgroundColor: "#ffffff0f" }}
              w="95%"
              onClick={nSetsModal.onOpen}
            >
              <span>Generar n sets</span>
            </Button>
          </Tooltip>
          <Tooltip
            placement="right"
            hasArrow
            label="Genera n tablas en pares de 2 y las 4 figuras del centro las usa en las esquinas de la siguiente tabla."
          >
            <Button
              _hover={{ backgroundColor: "#ffffff0f" }}
              w="95%"
              onClick={() => {
                openAlgoritmCEModal();
              }}
            >
              <span>Algoritmo CE</span>
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Box>
      {NSetsModalUI}
    </Flex>
  );
};
