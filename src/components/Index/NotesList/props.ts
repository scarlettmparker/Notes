import { Accessor } from "solid-js";

export default interface NoteListProps {
    noteIDs: Accessor<number[]>;
    noteTitles: Accessor<string[]>;
    setTitleID: (value: number) => void;
    currentNoteID: Accessor<number>;
    setCurrentNoteID: (value: number) => void;
    setNoteLoaded: (value: boolean) => void
}