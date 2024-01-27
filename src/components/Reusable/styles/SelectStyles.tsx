import { CSSObjectWithLabel } from "react-select"

const borderEnabledColor = "#007AFF"
const borderDisabledColor = "#d5d5d580"
const placeholderEnabledTextColor = "#ffffff88";
const placeholderDisabledTextColor = "#d5d5d572";
//const inputTextColor = "#";
//const inputBackground = "#00000000";
const scrollBarColor = "#007AFFda";

export const customSelectStyles = (enabled: boolean) => {
    return {
        control: (styles: CSSObjectWithLabel) => {
            return {
                ...styles,
                transition: "0.32s all",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "16px",
                border: enabled ? borderEnabledColor + " 1px solid" : borderDisabledColor + " 1px solid",
                ":hover": {
                    border: enabled ? borderEnabledColor + " 1px solid" : borderDisabledColor + " 1px solid",
                }
            }
        },
        container: (styles: CSSObjectWithLabel) => {
            return {
                ...styles,
                transition: "all 0.32s",
                color: "white",
            }

        },
        placeholder: (styles: CSSObjectWithLabel) => {
            return {
                ...styles,
                color: placeholderEnabledTextColor,
                ":disabled": {
                    color: placeholderDisabledTextColor,
                }
            }
        },

        menu: (styles: CSSObjectWithLabel) => {
            return {
                ...styles,
                backgroundColor: "#141414cc",
                borderRadius: 8,
            }

        },
        menuList: (styles: CSSObjectWithLabel) => {
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
                    background: scrollBarColor
                }
            }
        },
        input: (styles: CSSObjectWithLabel) => {
            return {
                ...styles,
                color: "#ffffffdd",
                cursor: "text",
                ":disabled": {
                    color: "#d5d5d552",
                }
            }

        },
        singleValue: (styles: CSSObjectWithLabel) => {
            return {
                ...styles, color: "#ffffff",
                ":disabled": {
                    color: "#d5d5d572",
                }
            }
        },

        option: (styles: CSSObjectWithLabel) => {
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