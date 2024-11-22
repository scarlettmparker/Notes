import { Accessor } from "solid-js";
import { supabase } from "~/helper/supabaseClient";
import { getSession } from "~/helper/utils";
import { setNoteMenuData } from "../NotesWrapper/utils";
import { updateTitles } from "./utils";

/**
 * Handles updating note content and titles on Supabase database changes.
 */
const handleUpdate = (payload: any, noteTitles: Accessor<string[]>, setNoteTitles: (value: string[]) => void,
    noteIDs: Accessor<number[]>, currentNoteID: Accessor<number>, setContent: (value: string) => void, editing: Accessor<boolean>) => {
    const updatedNote = payload.new;
    const id = updatedNote.id;

    updateTitles(updatedNote.title, noteTitles(), setNoteTitles, noteIDs().indexOf(id));
    if (id == currentNoteID() && !editing()) {
        setContent(updatedNote.content);
    }
}

/**
 * Handles deleting notes on Supabase database changes.
 */
const handleDelete = (payload: any, noteTitles: Accessor<string[]>, setNoteTitles: (value: string[]) => void, titleID: Accessor<number>, noteIDs: Accessor<number[]>, setNoteIDs: (value: number[]) => void, setNewNoteID: (value: number) => void, session: any) => {
    const deletedNote = payload.old;

    setNoteIDs(noteIDs().filter(id => id !== deletedNote.id));
    setNoteTitles(noteTitles().filter((_, index) => index !== titleID()));
    setNoteMenuData(setNoteIDs, setNewNoteID, setNoteTitles, session);
}

/**
 * Handles subscribing to changes on the Supabase database.
 * @param noteTitles Getter for list of note titles to update. 
 * @param setNoteTitles Setter for list of note titles.
 * @param noteIDs Getter for all note IDs (from supabase).
 * @param setNoteIDs Setter for note IDs.
 * @param currentNoteID Current note ID (what the user has open).
 * @param titleID Local title ID for displaying changes.
 * @param setNewNoteID Setter for the new note ID.
 * @param setContent Setter for the inner content of the note.
 * @param editing Getter for whether the user is currently editing content (prevents overlaps).
 */
export const subscribeChanges = (noteTitles: Accessor<string[]>, setNoteTitles: (value: string[]) => void, noteIDs: Accessor<number[]>, setNoteIDs: (value: number[]) => void,
    currentNoteID: Accessor<number>, titleID: Accessor<number>, setNewNoteID: (value: number) => void, setContent: (value: string) => void, editing: Accessor<boolean>) => {
    const session = getSession();

    if (!session) return;

    supabase
        .channel('note_channel')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: 'Note' },
            (payload) => { // RLS policies are set so checks aren't performed client side
                if (payload.eventType === 'INSERT') {
                    setNoteMenuData(setNoteIDs, setNewNoteID, setNoteTitles, session);
                } else if (payload.eventType === 'DELETE') {
                    handleDelete(payload, noteTitles, setNoteTitles, titleID, noteIDs, setNoteIDs, setNewNoteID, session);
                } else if (payload.eventType === 'UPDATE') {
                    handleUpdate(payload, noteTitles, setNoteTitles, noteIDs, currentNoteID, setContent, editing);
                }
            }
        )
        .subscribe();
}

export default null;