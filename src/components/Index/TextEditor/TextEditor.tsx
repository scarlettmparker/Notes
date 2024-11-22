import { onMount } from "solid-js";
import { autogrow } from "./utils";
import TextEditorProps from "./props";

/**
 * Text Editor Component.
 * @param style Tailwind CSS styling for textarea.
 * @param placeholder Placeholder text.
 * @param content Accessor for text content.
 * @param setContent Setter for text content.
 * @returns JSX styled textarea with auto resizing.
 */
const TextEditor = ({ style, placeholder, content, setContent, onBlur }: TextEditorProps) => {
    const inputStyle = "outline-none w-full text-left overflow-hidden resize-none";
    let ref!: HTMLTextAreaElement;

    onMount(() => {
        queueMicrotask(() => {
            autogrow(ref);
        });
    });

    return (
        <textarea ref={ref} spellcheck={false} class={`${style} ${inputStyle}`} value={content()} placeholder={placeholder} rows={1} onFocus={(e) => e.target.placeholder = ""}
            onBlur={(e) => { e.target.placeholder = placeholder!; if (onBlur) onBlur(e); }} onInput={(e) => { setContent(e.target.value); autogrow(e.target); }} />
    );
};

export default TextEditor;