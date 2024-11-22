import { Accessor } from "solid-js";

export default interface HoverableIconProps {
    src: string;
    hover: string;
    alt: string;
    size: number;
    divSize: number;
    onClick?: () => void;
    successMessage?: Accessor<string>;
}