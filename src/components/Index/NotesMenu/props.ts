import { Accessor } from "solid-js";

export default interface NotesMenuProps {
    noteIDs: Accessor<number[]>;
    noteTitles: Accessor<string[]>;
    newNoteID: Accessor<number>;
    setTitleID: (value: number) => void;
    currentNoteID: Accessor<number>;
    setCurrentNoteID: (value: number) => void;
    setNoteMenuData: () => void;
    setNoteLoaded: (value: boolean) => void;
}