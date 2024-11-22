import { Accessor } from "solid-js";

export default interface NoteEditorWrapperProps {
    currentNoteID: Accessor<number>;
    setCurrentNoteID: (value: number) => void;
    titleID: Accessor<number>;
    noteLoaded: Accessor<boolean>;
    setNoteLoaded: (value: boolean) => void;
    noteTitles: Accessor<string[]>;
    setNoteTitles: (value: string[]) => void;
    noteIDs: Accessor<number[]>;
    setNoteIDs: (value: number[]) => void
}