import {
    Button,
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,

    //useToast
} from "@chakra-ui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

//import { useState, useRef } from "react";
import { useRef, useState } from "react";
import { useFigureStore } from "../../../../store/figures";
import { Table } from "../../../../store/types";
import { useTablesStore } from "../../../../store/tables";
import { getURLImage } from "../../../../features/images/generateTableImage";
import { generateRandomMatrix } from "../../../../features/tables/generateRandomMatrix";
import { putComodin, putDoubleComodin } from "../../../../features/images/tableUtils";
interface ComodinProps {
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



const Comodin = (props: ComodinProps) => {
    //const toast = useToast();

    const { fullFigures } = useFigureStore((state) => state);
    const { tables, setTables } = useTablesStore((state) => state);

    const toast = useToast();
    const animatedComponents = makeAnimated();
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const figuresSelect = fullFigures.map(fig => {
        return { value: fig.id, label: fig.id + " - " + fig.name }
    })

    const [comodin, setComodin] = useState(0);
    const [isDouble, setIsDouble] = useState(false);
    const [customComodin, setCustomComodin] = useState(false);

    const handleGenerateComodinTables = async () => {
        const figureId = comodin;
        const comodinTables: Table[] = [];
        const size = Number(
            (document.getElementById("sizeInput") as HTMLInputElement).value
        );
        let tableIndex = getLastTableIndex({ tables });
        for (let nTable = 0; nTable < 54; nTable++) {
            tableIndex += 1;
            const id = customComodin ? figureId : nTable + 1;

            let newArray: number[][] = generateRandomMatrix(size, 1, 54, id);
            if (!isDouble) {
                newArray = putComodin(newArray, id);
            } else {
                newArray = putDoubleComodin(newArray, id);
            }
            console.log(newArray);
            const table: Table = {
                id: tableIndex,
                name: `Table${tableIndex}`,
                numbers: newArray,
                date: new Date().toISOString(),
                size: size,
                dataURL: await getURLImage(newArray, size),
            };
            console.log(id);
            comodinTables.push(table);
        }
        setTables(comodinTables);
    }




    /**
 * Función que obtiene el índice de la última tabla.
 * Si hay tablas en el array, retorna el índice de la última tabla más 1.
 * @returns El índice de la última tabla.
 */


    type getLastTableIndexProps = {
        tables: Table[];
    }
    const getLastTableIndex = ({ tables }: getLastTableIndexProps) => {
        let lastTableIndex = 0;
        if (tables[0]) {
            lastTableIndex = tables[tables.length - 1].id + 1;
        }
        console.log("id: " + lastTableIndex);
        return lastTableIndex;
    };


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
                    Generar 54 tablas comodin
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>

                        <FormLabel>
                            <Checkbox
                                mt={2}
                                size="sm"
                                checked={customComodin}
                                onChange={() => {
                                    setCustomComodin(!customComodin);
                                }}
                            >
                                Comodin Personalizado
                            </Checkbox>
                        </FormLabel>
                        <Select

                            //loadOptions={() => {}}
                            isDisabled={!customComodin}
                            components={animatedComponents}
                            styles={{

                                control: (styles) => {
                                    return {
                                        ...styles,

                                        backgroundColor: "transparent",
                                        color: "white",
                                        fontSize: "16px",
                                        ":disabled": {
                                            border: "#d5d5d582",
                                        }
                                    }
                                },
                                container: (styles) => {
                                    return {
                                        ...styles,
                                        overflow: 'hidden',
                                        transition: "all 0.32s",
                                        height: customComodin ? "initial" : "0px",
                                        color: "white",
                                    }

                                },
                                placeholder: (styles) => {
                                    return {
                                        ...styles,
                                        color: "#ffffff88",
                                        ":disabled": {
                                            color: "#d5d5d572",
                                        }
                                    }
                                },

                                menu: (styles) => {
                                    return {
                                        ...styles,
                                        backgroundColor: "#121619cc",
                                        borderRadius: 8,
                                        scrollbarColor: "#ab0",

                                    }

                                },
                                menuList: (styles) => {
                                    return {
                                        ...styles,
                                        "::-webkit-scrollbar": {
                                            width: "4px",
                                            height: "0px",
                                        },
                                        "::-webkit-scrollbar-track": {
                                            background: "transparent"
                                        },
                                        "::-webkit-scrollbar-thumb": {
                                            background: "#888"
                                        },
                                        "::-webkit-scrollbar-thumb:hover": {
                                            background: "#555"
                                        }
                                    }
                                },
                                input: (styles) => {
                                    return {
                                        ...styles,
                                        color: "#ffffffdd",
                                        cursor: "text",
                                        ":disabled": {
                                            color: "#d5d5d572",
                                        }
                                    }

                                },
                                singleValue: (styles) => {
                                    return {
                                        ...styles, color: "#ffffff",
                                        ":disabled": {
                                            color: "#d5d5d572",
                                        }
                                    }
                                },

                                option: (styles) => {
                                    return {
                                        ...styles,
                                        fontSize: "16px",
                                        transition: "0.32s all",
                                        backgroundColor: "transparent",
                                        ":hover": {
                                            backgroundColor: "#23252C",
                                        },
                                    }
                                }
                            }
                            }
                            options={figuresSelect}
                            defaultValue={figuresSelect[0]}
                            onChange={(e) => {
                                const value = e && 'value' in e ? e.value : 0;
                                setComodin(value);

                            }}
                        />
                        {/* {figures.map((f) => {
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
                            })} */}
                        <CheckboxGroup>
                            <Checkbox
                                mt={2}
                                size="sm"
                                checked={isDouble}
                                onChange={() => {
                                    setIsDouble(!isDouble);
                                }}
                            >
                                Doble comodin
                            </Checkbox>

                        </CheckboxGroup>
                    </FormControl>


                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        size="sm"
                        onClick={() => {
                            const res = handleGenerateComodinTables();

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
        </Modal >
    );
};

export default Comodin;