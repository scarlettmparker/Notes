import { Accessor } from "solid-js";

export default interface TextEditorProps {
    style?: string;
    placeholder?: string;
    content: Accessor<string>;
    setContent: (value: string) => void;
    onBlur?: (event: FocusEvent) => void
}