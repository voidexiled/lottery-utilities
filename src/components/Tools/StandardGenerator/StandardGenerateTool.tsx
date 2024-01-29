import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Flex,
    FormControl,
    FormLabel,
    Image,
    List,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useFeaturesStore } from "../../../store/features";
import { Feature } from "../../../constants/types";
import { useFigureStore } from "../../../store/figures";
import {
    generateRandomMatrix,
    getRandom,
} from "../../../features/tables/generateRandomMatrix";
import { useTablesStore } from "../../../store/tables";
import { Table } from "../../../store/types";
import { getURLImage } from "../../../features/images/generateTableImage";
import Select from "react-select";
import { customSelectStyles } from "../../Reusable/styles/SelectStyles";
import { useEffect, useState } from "react";
import { putCustomComodin } from "./lib";
import { useFilePicker } from 'use-file-picker';
import {
    FileAmountLimitValidator,
    FileTypeValidator,
    FileSizeValidator,
    ImageDimensionsValidator,
} from 'use-file-picker/validators';
import { useComodinStore } from "../../../store/comodin";

export const StandardGenerateTool = () => {
    const { comodin: customComodin, setWEBP, setCustomComodin } = useComodinStore((state) => state);
    const { openFilePicker: openFilePickerWEBP, filesContent: filesContentWEBP } = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/webp',
        multiple: false,
        validators: [
            new FileAmountLimitValidator({ max: 1 }),
            new FileTypeValidator(['webp']),
            new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
            new ImageDimensionsValidator({
                maxHeight: 1754, // in pixels
                maxWidth: 1107,
                minHeight: 1754,
                minWidth: 1107,
            }),
        ],
    });

    const { features, setFeatures } = useFeaturesStore((state) => state);
    const { figures } = useFigureStore((state) => state);
    const { tables, setTables } = useTablesStore((state) => state);
    const toast = useToast();
    const [comodin, setComodin] = useState(0);
    const [withCustomComodin, setWithCustomComodin] = useState(false);


    useEffect(() => {
        if (filesContentWEBP.length > 0) {
            setWEBP(filesContentWEBP[0].content)
        }
    }, [filesContentWEBP]);

    const handleConfig = (featureId: number) => {
        const actived = features.find((f) => f.id === featureId)
            ?.selected;
        const newFeatures = features.map((f) => {
            if (f.id === featureId) {
                return {
                    ...f,
                    selected: !actived,
                };
            }
            return f;
        });
        if (featureId === 0) {
            if (!features[0].selected) {
                setComodin(0);
                console.log("HOLA");
            }
        }
        console.log("FEATURE ID: ", featureId)

        setFeatures(newFeatures);
    };


    const handleGenerate = async () => {
        const sizeInput = document.getElementById(
            "sizeInput"
        ) as HTMLInputElement;
        const cantidadInput = document.getElementById(
            "cantidadTablasInput"
        ) as HTMLInputElement;
        const comodinInput = document.getElementById(
            "comodinInput"
        ) as HTMLInputElement;

        //const withComodin: boolean = comodin > 0;
        const withComodin =
            comodinInput.getElementsByTagName("div")[0]?.getAttribute("aria-disabled") === null;

        console.log(" COMODIN WHEN HANDLE GENERATE: ", comodin)

        //TODO: CHANGE COMODIN INPUT TO STATE

        const size = Number(sizeInput?.value);
        const cantidad = Number(cantidadInput?.value);
        // console.log(withComodin);
        console.log({
            q: cantidad,
            size: size,
            comodin: withComodin ? comodin : 0,
        });

        const localTables: Table[] = [];
        let lastTableIndex = 0;
        if (tables[0]) {
            lastTableIndex = tables[tables.length - 1].id + 1;
        }

        for (let i = 0; i < cantidad; i++) {
            let matrix = generateRandomMatrix(
                size,
                1,
                54,
                withComodin ? comodin : 0
            );
            if (withComodin) {
                matrix = putComodinIntoTable(matrix, comodin);
                console.log(matrix);
            }
            if (withCustomComodin) {
                matrix = putCustomComodin(matrix);
                console.log(matrix);
            }

            const t: Table = {
                id: lastTableIndex,
                name: `Table${lastTableIndex}`,
                numbers: matrix,
                date: new Date().toISOString(),
                size: size,
                dataURL: await getURLImage(matrix, size, customComodin),
                comodin: withComodin ? comodin : 0,
            };
            console.log(t)

            localTables.push(t);
            lastTableIndex++;
        }

        setTables(localTables);
    };



    const putComodinIntoTable = (
        table: number[][],
        comodin: number
    ): number[][] => {
        const centerFeature = features.find(
            (feature) => feature.name === "Centro"
        );
        const edgeFeature = features.find(
            (feature) => feature.name === "Esquinas"
        );
        // const cornerFeature = features.find(
        //   (feature) => feature.name === "Bordes"
        // );

        if (centerFeature && edgeFeature) {
            const inCenter = centerFeature.selected;
            const inEdges = edgeFeature.selected;
            // const inCorners = cornerFeature.selected;

            if (inCenter && inEdges) {
                let t = table;
                t = putComodinInCenter(t, comodin);
                t = putComodinInEdge(t, comodin);
                return t;
            } else if (inCenter) {
                return putComodinInCenter(table, comodin);
            } else if (inEdges) {
                return putComodinInEdge(table, comodin);
            } else {
                return putComodinRandomly(table, comodin);
            }
        }

        return table;
    };

    const putComodinRandomly = (
        table: number[][],
        comodin: number
    ): number[][] => {
        const tableWithComodin = table;
        const randomPlace = (): { x: number; y: number } => {
            const row: number = getRandom(
                0,
                tableWithComodin.length - 1
            );
            const column: number = getRandom(
                0,
                tableWithComodin.length - 1
            );
            //return { x: row, y: column };
            console.log(row, column);
            return { x: 2, y: 0 };
        };
        const place: { x: number; y: number } = randomPlace();
        tableWithComodin[place.x][place.y] = comodin;
        return tableWithComodin;
    };

    const putComodinInCenter = (
        table: number[][],
        comodin: number
    ): number[][] => {
        const tableWithComodin = table;
        const figuresInCenter = (table.length - 2) ** 2;
        const randomPlace = {
            x: getRandom(1, tableWithComodin.length - 2),
            y: getRandom(1, tableWithComodin.length - 2),
        };
        console.log(randomPlace);
        let setted: boolean;
        //TODO 1<= row * column <= figuresInCenter
        tableWithComodin.forEach((row) => {
            row.forEach((column) => {
                const place = {
                    x: tableWithComodin.indexOf(row),
                    y: row.indexOf(column),
                };
                console.log(place);
                console.log(randomPlace);
                console.log(row, column);
                const x = tableWithComodin.indexOf(row);
                const y = row.indexOf(column);
                console.log({ x: x, y: y });
                if (
                    1 <= x &&
                    x <= tableWithComodin.length - 2 &&
                    1 <= y &&
                    y <= tableWithComodin.length - 2
                ) {
                    if (
                        place.x == randomPlace.x &&
                        place.y == randomPlace.y &&
                        !setted
                    ) {
                        setted = true;
                        tableWithComodin[x][y] = comodin as number;
                        console.log(x, y);
                        console.log(tableWithComodin);
                    }
                }
            });
        });
        console.log(figuresInCenter);
        return tableWithComodin;
    };
    const putComodinInEdge = (
        table: number[][],
        comodin: number
    ): number[][] => {
        const tableWithComodin = table;
        const edges = [
            { x: 0, y: 0 },
            { x: 0, y: tableWithComodin.length - 1 },
            { x: tableWithComodin.length - 1, y: 0 },
            {
                x: tableWithComodin.length - 1,
                y: tableWithComodin.length - 1,
            },
        ];
        const randomEdge = (): { x: number; y: number } => {
            const rand = Math.floor(Math.random() * 4);
            console.log(rand);
            return edges[rand];
        };

        const edge: { x: number; y: number } = randomEdge();
        console.log(edge);
        tableWithComodin[edge.x][edge.y] = comodin;
        console.log(tableWithComodin);

        return tableWithComodin;
    };

    const handleDisabled = (f: Feature): boolean => {
        const dependency = features.find(
            (feature) => feature.id === f.conditionId
        );
        if (dependency) {
            if (dependency.selected) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };

    const handleComodinSelectDisable = (): boolean => {
        const comodinSelected = features?.find(
            (f) => f.name === "Comodin"
        )?.selected;
        const dobleComodinSelected = features?.find(
            (f) => f.name === "Doble comodin"
        )?.selected;
        console.log(comodinSelected);
        console.log(dobleComodinSelected);
        console.log(comodinSelected || dobleComodinSelected);
        return !(comodinSelected || dobleComodinSelected);
    };
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
                    Configuraciones
                </Text>
                <Box>
                    <Button
                        variant="outline"
                        colorScheme="pink.500"
                        onClick={openFilePickerWEBP}

                    >Seleccionar .webp</Button>
                    <List>
                        {filesContentWEBP.map((file, index) => (
                            <li key={index}>
                                <Image h="130px" src={file.content} />
                            </li>
                        ))}
                    </List>
                </Box>
                <CheckboxGroup
                    colorScheme="green"
                    defaultValue={features
                        .filter((feature) => feature.selected)
                        .map((feature) => feature.name)}
                >
                    <Stack
                        spacing={[1, 2]}
                        direction={["column", "row"]}
                        flexWrap="wrap"
                    >
                        <Checkbox colorScheme="messenger" textColor="messenger.500" value="Custom" onChange={() => {
                            setWithCustomComodin(!withCustomComodin)
                            setCustomComodin(withCustomComodin)
                        }}>

                            Custom

                        </Checkbox>
                        {features.map((feature) => {
                            const disabled: boolean = handleDisabled(
                                feature
                            );
                            return (
                                <Checkbox
                                    key={feature.id}
                                    value={feature.name}
                                    onChange={() => handleConfig(feature.id)}
                                    colorScheme={
                                        disabled ? "pink" : "messenger"
                                    }
                                    textColor={
                                        disabled
                                            ? "pink.500"
                                            : feature.selected
                                                ? "messenger.500"
                                                : "messenger.700"
                                    }
                                    disabled={disabled}
                                >
                                    {feature.name}
                                </Checkbox>
                            );
                        })}
                    </Stack>
                </CheckboxGroup>
            </Box>

            <FormControl as="form">
                <FormLabel fontSize={16}>
                    Cantidad de tablas
                    <NumberInput
                        size="sm"
                        variant="outline"
                        defaultValue={1}
                        min={1}
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
                </FormLabel>
                <FormLabel fontSize={16}>
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
                <FormLabel fontSize={16}>
                    Comodin

                    <Select
                        id="comodinInput"
                        styles={customSelectStyles(!handleComodinSelectDisable())}
                        isDisabled={handleComodinSelectDisable()}
                        onChange={(e) => {
                            const value = e && 'value' in e ? e.value : 0;
                            setComodin(value);
                        }}
                        options={
                            figures.map((f) => {
                                return {
                                    value: f.id,
                                    label: f.id + " - " + f.name,
                                };
                            })
                        }
                    />





                    {/* <Select
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
                        disabled={handleComodinSelectDisable()}
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
                    </Select> */}
                </FormLabel>
                <Button
                    mt={4}
                    size="sm"
                    w="calc(100% - 12px)"
                    variant="outline"
                    colorScheme="messenger"
                    onClick={() => {
                        const res = handleGenerate();

                        toast.promise(res, {
                            loading: { title: "Generando tablas...", description: "Espera un momento..." },
                            success: { title: "Tablas generadas!", description: "Se han generado correctamente", duration: 700, isClosable: true },
                            error: { title: "Error al generar", description: "Ha ocurrido un error.", duration: 2000, isClosable: true },
                        })
                    }}
                >
                    Generar
                </Button>
            </FormControl>
        </Flex>
    );
};
