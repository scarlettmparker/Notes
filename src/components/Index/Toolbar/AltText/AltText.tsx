import { LM_ALIGN } from "~/consts/style"

/**
 * Alt text component that displays above element (given relative parent).
 * @param alt Text to display.
 * @param style Extra styling (tailwind) for the element.
 * @returns JSX element for the alt text component. 
 */
const AltText = ({ alt, style }: { alt: string, style?: string }) => {
    return (
        <span class={`${style} absolute z-20 bottom-full ${LM_ALIGN} whitespace-nowrap mb-1 py-0.5 px-1.5 bg-thunder text-white text-sm font-['Open_Sans'] rounded-md select-none flex items-center justify-center`}>
            {alt}
        </span>
    )
}

export default AltText;