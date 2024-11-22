import { Accessor } from "solid-js";

export default interface NoteEditorProps {
    currentNoteID: Accessor<number>;
    titleID: Accessor<number>;
    noteLoaded: Accessor<boolean>;
    setNoteLoaded: (value: boolean) => void;
    noteTitles: Accessor<string[]>;
    setNoteTitles: (value: string[]) => void
}