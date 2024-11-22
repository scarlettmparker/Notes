import { createContext, createSignal, JSX } from "solid-js";

export const SignalContext = createContext({
    title: () => "" as string,
    setTitle: (value: string) => {},
    content: () => "" as string,
    setContent: (value: string) => {},
    editing: () => false as boolean,
    setEditing: (value: boolean) => false,
    menuOpen: () => true as boolean,
    setMenuOpen: (value: boolean) => true
});

export const SignalProvider = (props: { children: number | boolean | Node | JSX.ArrayElement | (string & {}) | null | undefined; }) => {
    const [title, setTitle] = createSignal("");
    const [content, setContent] = createSignal("");
    const [editing, setEditing] = createSignal(false);
    const [menuOpen, setMenuOpen] = createSignal(true);
    
    const value = { title, setTitle, content, setContent, editing, setEditing, menuOpen, setMenuOpen };

    return (
        <SignalContext.Provider value={value}>
            {props.children}
        </SignalContext.Provider>
    );
};

export default null;