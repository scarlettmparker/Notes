import { Accessor } from "solid-js";
import { supabase } from "~/helper/supabaseClient";
import { getSession } from "~/helper/utils";

/**
 * Deletes a note (for supabase, updates locally as well).
 * @param currentNoteID Current note ID to delete.
 * @param noteIDs List of note IDs (for setting).
 * @param setNoteIDs Setter for note ID display.
 * @param setCurrentNoteID Setter for current note ID.
 * @param titleID Current title ID display (for setting).
 * @param noteTitles List of title IDs display.
 * @param setNoteTitles Setter for title IDs display.
 */
export const deleteNote = async (currentNoteID: number, setCurrentNoteID: (value: number) => void, noteIDs: Accessor<number[]>, setNoteIDs: (value: number[]) => void, titleID: Accessor<number>, noteTitles: Accessor<string[]>, setNoteTitles: (value: string[]) => void) => {
    const session = getSession();

    // delete the note from the sidebar display
    const deleteNoteDisplay = () => {
        setNoteIDs(noteIDs().filter(id => id !== currentNoteID));
        setNoteTitles(noteTitles().filter((_, index) => index !== titleID()));
    }

    if (!session) {
        deleteNoteDisplay();
        deleteLocalNote(currentNoteID);
        setCurrentNoteID(-1);
        return;
    }

    const { data, error } = await supabase
        .from('Note')
        .delete()
        .eq('id', currentNoteID);

    if (error) {
        console.error("Error deleting note:", error);
        return;
    } else {
        deleteNoteDisplay();
        setCurrentNoteID(-1);
    }
}

/**
 * Deletes a note locally
 * @param noteID Note ID to delete.
 */
const deleteLocalNote = (noteID: number) => {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`note-${noteID}-`)) {
            localStorage.removeItem(key);
        }
    });
}

export default null;