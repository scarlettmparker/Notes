import { Accessor } from "solid-js";
import { supabase } from "~/helper/supabaseClient";

/**
 * Truncate a given string.
 * @param str String to truncate. 
 * @param truncate Truncate length.
 * @returns Truncated string + "...".
 */
export const truncate = (str: string, truncate: number) => {
    if (!str) return;
    if (str.length < truncate) return str;
    return str.slice(0, truncate).trimEnd() + "...";
}

/**
 * Creates a new note in local storage.
 * @param setCurrentNoteID Setter for the current (new) note ID.
 * @param newNoteID Accessor for the new note ID to set the note ID. 
 * @param fetchNoteIDs Fetch note IDs (from local storage).
 */
export const createLocalNote = (setCurrentNoteID: (value: number) => void, newNoteID: Accessor<number>, fetchNoteIDs: () => void) => {
    localStorage.setItem(`note-${newNoteID()}-title`, "");
    localStorage.setItem(`note-${newNoteID()}-content`, "");

    setCurrentNoteID(newNoteID());
    fetchNoteIDs();
}

/**
 * Creates a new note in the supabase database.
 * @param setCurrentNoteID Setter for the current (new) note ID.
 * @param fetchNoteIDs Fetch note IDs (from supabase).
 */
export const createNote = async (setCurrentNoteID: (value: number) => void, fetchNoteIDs: () => void) => {
    const { data, error } = await supabase
        .from('Note')
        .insert({})
        .select('id');

    if (error) {
        console.error('Error inserting note:', error);
        return [];
    }

    if (data && data.length > 0) {
        const noteID = data[0].id;
        setCurrentNoteID(noteID);
        fetchNoteIDs();
    } else {
        console.error('No data returned after inserting note.');
    }
}

export default null;