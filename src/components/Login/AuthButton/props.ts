import { Accessor } from "solid-js";

export default interface AuthProps {
    text: Accessor<string>;
    register: Accessor<boolean>;
    email: Accessor<string>;
    password: Accessor<string>;
    setError: (value: string) => void;
}