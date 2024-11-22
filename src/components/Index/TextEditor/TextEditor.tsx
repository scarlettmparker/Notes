import { createEffect } from "solid-js";
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
    
    return (
        <textarea spellcheck={false} class={`${style} ${inputStyle}`} style="field-sizing: content;" value={content()} placeholder={placeholder}
            onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => { e.target.placeholder = placeholder!; if (onBlur) onBlur(e); }} onInput={(e) => setContent(e.target.value)} />
    );
};

export default TextEditor;