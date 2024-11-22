import { createEffect } from "solid-js";
import { truncate } from "../NotesMenu/utils";
import NoteListProps from "./props";

/**
 * @param noteIDs List of note IDs to populate notes with.
 * @param noteTitles List of note titles to display.
 * @param setCurrentNoteID Sets the note ID to display the editor with.
 * @returns JSX note list element containing all note titles.
 */
const NoteList = ({ noteIDs, noteTitles, setTitleID, currentNoteID, setCurrentNoteID, setNoteLoaded }: NoteListProps) => {
    const style = "text-thunder cursor-pointer select-none rounded-md hover:bg-[#f5f2f2] w-[95%]";
    const selectedStyle = " relative py-1/2 px-2 bg-thunder text-white border border-1 hover:bg-slate-200 hover:text-black hover:border-slate-300 box-border";

    // update the note ids and titles on note change
    createEffect(() => {
        const id = currentNoteID();
        const idx = noteIDs().indexOf(id);

        if (idx !== -1) {
            setNoteLoaded(false);
            setCurrentNoteID(noteIDs()[idx]);
            setTitleID(idx);
        }
    });

    return (
        <div class={"scrollbar flex flex-col relative ml-6 w-[88%] h-full overflow-y-auto"}>
            {noteTitles().map((title, idx) => (
                <span id='click-ignore' class={`${style} ${currentNoteID() == noteIDs()[idx] ? selectedStyle : ""}`} onclick={() => {
                    setCurrentNoteID(-1);
                    setCurrentNoteID(noteIDs()[idx]);
                }}>{truncate(title, 40)}</span>
            ))}
        </div>
    )
}

export default NoteList;