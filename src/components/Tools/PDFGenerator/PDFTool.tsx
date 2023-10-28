import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { useTablesStore } from "../../../store/tables";
import { useImagesStore } from "../../../store/images";
import { jsPDF } from "jspdf";
import { generateTableImage } from "../../../features/images/generateTableImage";

export const PDFTool = () => {
  const tables = useTablesStore((state) => state.tables);
  const images = useImagesStore((state) => state.images);
  const setImages = useImagesStore(
    (state) => state.setImages
  );

  const addImagesToStore = () => {
    const tempStrings: string[] = [];
    tables
      .sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
      .forEach(async (table) => {
        console.log(table);
        await generateTableImage(table).then((image) => {
          //addImage(image.toDataURL("image/jpeg", 0.5));
          tempStrings.push(
            image.toDataURL("image/jpeg", 0.5)
          );
        });
      });
    console.log(tempStrings);
    setImages(tempStrings);
  };

  const handleGeneratePdf = async () => {
    addImagesToStore();

    const doc = new jsPDF({
      orientation: "p",
      unit: "cm",
      format: "a4",
      putOnlyUsedFonts: true,
      compress: true,
    });

    //    const maxImagesPerPage = 4; // Máximo de imágenes por página
    const imgWidth = 7.6; // Ancho de cada imagen en cm
    const imgHeight = 12.4; // Alto de cada imagen en cm

    let x = 1; // Posición X inicial en cm
    let y = 1; // Posición Y inicial en cm

    for (const image of images) {
      console.log(image);
      if (x + imgWidth > 21) {
        // Si no hay suficiente espacio en la fila actual, pasa a la siguiente fila
        x = 1;
        y += imgHeight;
      }

      if (y + imgHeight > 29.7) {
        // Si no hay suficiente espacio en la página actual, añade una nueva página
        doc.addPage();
        y = 1;
      }

      if (
        typeof image === "string" &&
        image.startsWith("data:image")
      ) {
        doc.setFontSize(12);
        doc.addImage(
          image,
          "JPEG",
          x,
          y,
          imgWidth,
          imgHeight
        );
        console.log("Imagen añadidad:" + image);
        x += imgWidth;
      }

      if (x > 21) {
        // Si llegamos al final de la fila, reinicia X y pasa a la siguiente fila
        x = 1;
        y += imgHeight;
      }

      if (y > 29.7) {
        // Si llegamos al final de la página, añade una nueva página
        doc.addPage();
        y = 1;
      }
    }

    // Guarda o muestra el PDF
    // doc.save();
    const pdfData = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfData);
    window.open(pdfUrl);
  };
  return (
    <Flex
      as="section"
      w="full"
      h="full"
      direction="column"
      color="rgba(255,255,255,0.72)"
    >
      <Text
        w="full"
        fontWeight="medium"
        fontSize={20}
        mb={4}
      >
        Generar PDF
      </Text>
      <Box mb={8}>
        <InputGroup size="sm">
          <InputLeftAddon
            bg="transparent"
            borderColor="messenger.500"
            _focus={{
              borderColor: "messenger.600",
            }}
            _hover={{
              borderColor: "messenger.700",
            }}
          >
            {tables && tables.length}
          </InputLeftAddon>
          <Input
            value="Tablas"
            borderColor="messenger.500"
            _focus={{
              borderColor: "messenger.600",
            }}
            _hover={{
              borderColor: "messenger.700",
            }}
            contentEditable="false"
          ></Input>
        </InputGroup>
      </Box>

      <FormControl as="form" m={0}>
        <FormLabel fontSize={16} m={0} pb={8}>
          Tamaño en cm de la tabla
          <InputGroup
            size="sm"
            gap={2}
            flexDirection={{
              base: "column",
              xl: "row",
            }}
          >
            <InputGroup>
              <InputLeftAddon
                bg="messenger.700"
                borderColor="messenger.600"
                px={1}
              >
                {"W"}
              </InputLeftAddon>
              <NumberInput
                size="sm"
                variant="outline"
                defaultValue={1.0}
                min={1.0}
                precision={1}
                step={0.1}
              >
                <NumberInputField
                  id="cantidadTablasInput"
                  placeholder="25"
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
            </InputGroup>
            <InputGroup>
              <InputLeftAddon
                bg="messenger.700"
                borderColor="messenger.600"
                px={1}
              >
                {"H"}
              </InputLeftAddon>

              <NumberInput
                size="sm"
                variant="outline"
                defaultValue={1.0}
                min={1.0}
                precision={1}
                step={0.1}
              >
                <NumberInputField
                  id="cantidadTablasInput"
                  placeholder="25"
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
            </InputGroup>
          </InputGroup>
        </FormLabel>
        <Box mb={8}>
          <ButtonGroup size="sm">
            <Button
              colorScheme="green"
              onClick={handleGeneratePdf}
            >
              Generar PDF
            </Button>
          </ButtonGroup>
        </Box>
      </FormControl>
    </Flex>
  );
};
