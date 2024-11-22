import { onCleanup } from "solid-js";
import { NO_NOTE } from "~/consts/note";
import { supabase } from "~/helper/supabaseClient";

/**
 * Gets a list of note IDs from local storage.
 * @returns List of note IDs
 */
export const getLocalNoteIDs = () => {
    const noteIds = new Set();

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('note-')) {
            const match = key.match(/^note-(\d+)-/);
            if (match) {
                const id = match[1];
                noteIds.add(id);
            }
        }
    }

    return Array.from(noteIds) as number[];
};

/**
 * Gets a list of note titles from local storage.
 * @param noteIDs List of note IDs.
 * @returns List of note titles.
 */
export const getLocalNoteTitles = (noteIDs: number[]) => {
    const titles: string[] = [];

    noteIDs.forEach((noteID) => {
        const title = localStorage.getItem(`note-${noteID}-title`);
        if (title) {
            titles.push(title);
        } else if (title == "") {
            titles.push("Untitled note");
        }
    })

    return titles;
}

/**
 * Sets the menu data from localstorage note information.
 * @param setNoteIDs Setter for the list of note IDs.
 * @param setNewNoteID Setter for creating any new notes.
 * @param setNoteTitles Setter for list of note titles to display.
 */
export const setLocalNoteMenuData = (setNoteIDs: (value: number[]) => void, setNewNoteID: (value: number) => void, setNoteTitles: (value: string[]) => void) => {
    const noteIDs = getLocalNoteIDs();
    
    if (noteIDs) {
        const sortedNoteIDs = noteIDs.sort((a, b) => a - b);
        setNoteIDs(sortedNoteIDs);
        setNewNoteID(sortedNoteIDs[sortedNoteIDs.length - 1] + 1 || 1); // get final index and increment
        setNoteTitles(getLocalNoteTitles(sortedNoteIDs));
    }
}

/**
 * Gets a list of note IDs belonging to the user from Supabase.
 * @param userId User UUID from auth.
 * @returns List of note IDs.
 */
const getNoteIDs = async (userId: string) => {
    const { data, error } = await supabase
        .from('Note')
        .select('id')
        .eq('userId', userId);

    if (error) {
        console.error('Error fetching notes:', error);
        return [];
    }

    return data.map(note => note.id);
}

/**
 * Gets a list of note titles belonging to the user from Supabase.
 * @param noteIDs Note IDs to match to note titles.
 * @returns List of note titles.
 */
export const getNoteTitles = async (noteIDs: number[]) => {
    const { data, error } = await supabase
        .from('Note')
        .select('id, title')
        .in('id', noteIDs);

    if (error) {
        console.error('Error fetching note titles:', error);
        return [];
    }

    // map for default title values + sorted based on array
    const titles = data
        ?.map(note => ({
            id: note.id,
            title: note.title.trim(),
        })).sort((a, b) => noteIDs.indexOf(a.id) - noteIDs.indexOf(b.id)).map(note => note.title) || [];

    return titles;
}

/**
 * Sets the menu data from Supabase note information.
 * @param setNoteIDs Setter for the list of note IDs.
 * @param setNewNoteID Setter for creating any new notes.
 * @param setNoteTitles Setter for list of note titles to display.
 */
export const setNoteMenuData = async (setNoteIDs: (value: number[]) => void, setNewNoteID: (value: number) => void, setNoteTitles: (value: string[]) => void, session: any) => {
    const noteIDs = await getNoteIDs(session.user.id);

    if (noteIDs) {
        setNoteIDs(noteIDs);
        setNewNoteID(noteIDs.length + 1);

        const noteTitles = await getNoteTitles(noteIDs);
        setNoteTitles(noteTitles);
    }
}

/**
 * Handles clicks outside of specified elements to reset the current note ID.
 * @param event - Mouse event triggered by the click.
 * @param setCurrentNoteID - Setter for the current note ID.
 */
export const handleClickOutside = (event: MouseEvent, setCurrentNoteID: (value: number) => void) => {
    const clickableElement = event.target instanceof HTMLElement && (event.target.closest('#click-ignore'));

    if (!clickableElement) {
        setCurrentNoteID(NO_NOTE);
    }
};

/**
 * Hook to handle click events outside the specified elements.
 * @param handler - Function when a click outside is detected.
 */
export const createClickOutside = (handler: (event: MouseEvent) => void) => {
    onCleanup(() => {
        document.removeEventListener('click', handler);
    });
    document.addEventListener('click', handler);
};

export default null;