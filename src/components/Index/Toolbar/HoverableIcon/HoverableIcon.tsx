import { createSignal } from "solid-js";
import HoverableIconProps from "./props";

// components
import AltText from "../AltText";

/**
 * 
 * @param props 
 * @returns 
 */
const HoverableIcon = ({ src, hover, alt, size, divSize, onClick, successMessage }: HoverableIconProps) => {
    const [imgSrc, setImgSrc] = createSignal(src);
    const [imgAlt, setImgAlt] = createSignal(false);

    return (
        <div class="relative">
            {imgAlt() && <AltText alt={alt} />}
            {(successMessage && successMessage()) && <AltText alt={successMessage!()} style={"bg-green-600"} />}
            <div class={`flex items-center justify-center cursor-pointer hover:bg-slate-100`} style={{width: `${divSize}px`}}
                onmouseenter={() => { setImgSrc(hover); setImgAlt(true); }} onmouseleave={() => { setImgSrc(src); setImgAlt(false); }} onclick={onClick} >
                <img style={{ height: `${size}px` }} src={imgSrc()} />
            </div>
        </div>
    );
};

export default HoverableIcon;