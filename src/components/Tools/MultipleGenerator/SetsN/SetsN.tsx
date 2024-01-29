import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
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
    Select,

} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useFigureStore } from "../../../../store/figures";
import { handleGenerateSetTablas } from "./lib";
import { useTablesStore } from "../../../../store/tables";
import { useComodinStore } from "../../../../store/comodin";
interface SetsNProps {
    disclose: {
        isOpen: boolean;
        onOpen: () => void;
        onClose: () => void;
        onToggle: () => void;
        isControlled: boolean;
        getButtonProps: (props?: unknown) => unknown;
        getDisclosureProps: (props?: unknown) => unknown;
    }
}

const SetsN = (props: SetsNProps) => {
    const { comodin: customComodin } = useComodinStore((state) => state);
    const { tables, setTables } = useTablesStore((state) => state);
    const { figures } = useFigureStore((state) => state);
    const toast = useToast();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [withoutComodin, setWithoutComodin] = useState(
        true
    );


    return (
        <Modal
            isOpen={props.disclose.isOpen}
            onClose={props.disclose.onClose}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            colorScheme="messenger"
            size={{
                base: "full",
                md: "xs",
                lg: "sm",
                xl: "md",
                "2xl": "lg",
            }}
            isCentered={true}
            closeOnEsc={true}
            closeOnOverlayClick={true}
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent
                bgColor="var(--night)"
                textColor="var(--light)"
            >
                <ModalHeader fontSize={{ base: "18px" }}>
                    Generar set de tablas
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>
                            <Checkbox
                                size="sm"
                                checked={withoutComodin}
                                onChange={() => {
                                    setWithoutComodin(!withoutComodin);
                                }}
                            >
                                Comodin
                            </Checkbox>
                        </FormLabel>
                        <Select
                            id="comodinInput"
                            size="sm"
                            variant="outline"
                            borderColor="messenger.500"
                            focusBorderColor="messenger.600"
                            _hover={{
                                borderColor:
                                    "var(--chakra-colors-messenger-700);",
                            }}
                            className="customScrollBar"
                            disabled={withoutComodin}
                        >
                            {figures.map((f) => {
                                return (
                                    <option
                                        className="customScrollBar"
                                        key={f.id}
                                        value={f.id}
                                        style={{
                                            color: "black",
                                        }}
                                    >
                                        {f.id + " - " + f.name}
                                    </option>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel fontSize={{ base: "16px" }}>
                            Cantidad de tablas:
                        </FormLabel>
                        <NumberInput
                            id="cantidadTablasInput"
                            size="sm"
                            variant="outline"
                            defaultValue={1}
                            min={1}
                            max={150}
                        >
                            <NumberInputField
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
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        size="sm"
                        onClick={() => {
                            const res = handleGenerateSetTablas({ setTables, figures, withoutComodin, tables, customComodin });
                            toast.promise(res, {
                                loading: { title: "Generando tablas...", description: "Espera un momento..." },
                                success: { title: "Tablas generadas!", description: "Se han generado correctamente", duration: 700, isClosable: true },
                                error: { title: "Error al generar", description: "Ha ocurrido un error.", duration: 2000, isClosable: true },
                            })
                        }}
                    >
                        Generar
                    </Button>
                    <Button onClick={props.disclose.onClose} size="sm">
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SetsN;