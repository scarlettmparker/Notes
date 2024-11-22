import { Accessor } from "solid-js";

export default interface FormInputBoxProps {
    text: string;
    type: string;
    ref?: Accessor<string>;
    setRef?: (value: string) => void;
    placeholder?: string
}