import { Accessor } from "solid-js";

export default interface DeleteProps {
    currentNoteID: Accessor<number>;
    setCurrentNoteID: (value: number) => void;
    titleID: Accessor<number>;
    noteTitles: Accessor<string[]>;
    setNoteTitles: (value: string[]) => void;
    noteIDs: Accessor<number[]>;
    setNoteIDs: (value: number[]) => void;
}