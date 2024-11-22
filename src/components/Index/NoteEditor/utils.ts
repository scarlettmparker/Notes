import { DEBOUNCE } from "~/consts/note";
import { supabase } from "~/helper/supabaseClient";
import { createDebounce } from "~/helper/utils";

/**
 * Helper function to get storage variables.
 * @param currentNoteID ID of the current note.
 * @returns Local storage names for note title and note content.
 */
const getStorage = (currentNoteID: number) => {
    const storageTitle = `note-${currentNoteID}-title`;
    const storageContent = `note-${currentNoteID}-content`;
    return [storageTitle, storageContent];
}

/**
 * Get the note details from local storage and display them.
 * @param currentNoteID ID of the note to load.
 * @param setTitle Setter for the title of the note.
 * @param setContent Setter for the content of the note.
 */
export const getLocalNote = (currentNoteID: number, setTitle: (value: string) => void, setContent: (value: string) => void) => {
    const [storageTitle, storageContent] = getStorage(currentNoteID);

    const getStorageTitle = localStorage.getItem(storageTitle);
    const getStorageContent = localStorage.getItem(storageContent);

    if (getStorageTitle) setTitle(getStorageTitle);
    else setTitle("");

    if (getStorageContent) setContent(getStorageContent);
    else setContent("");
}

/**
 * Get the note details from Supabase and display them.
 * @param currentNoteID ID of the note to load.
 * @param setTitle Setter for the title of the note.
 * @param setContent Setter for the content of the note.
 * @param setEditable Setter to disable textareas until data is loaded.
 */
export const getNote = async (currentNoteID: number, setTitle: (value: string) => void, setContent: (value: string) => void, setNoteLoaded: (value: boolean) => void) => {
    const { data, error } = await supabase
        .from('Note')
        .select('title, content')
        .eq('id', currentNoteID);

    if (error) {
        console.error('Error fetching note titles:', error);
        return [];
    }

    if (data && data.length > 0) {
        setTitle(data[0].title);
        setContent(data[0].content);
        setNoteLoaded(true);
    } else {
        console.error('No note found.');
        setNoteLoaded(false);
    }
}

/**
 * Saves the current note the user is editing to local storage (with debounce).
 * @param currentNoteID ID of the note to save.
 * @param content Content to save to local storage.
 * @param name Attribute to save to (e.g. "title or "content").
 */
const debouncedLocalSave = createDebounce(
    (currentNoteID: number, content: string, name: string) => {
        const storage = `note-${currentNoteID}-${name}`;
        localStorage.setItem(storage, content);
    }, DEBOUNCE);

export const saveLocalNote = (currentNoteID: number, content: string, name: string) => {
    debouncedLocalSave(currentNoteID, content, name);
};

/**
 * Saves the current note the user is editing to supabase (with debounce).
 * @param currentNoteID ID of the note to save.
 * @param content Content to save to supabase.
 * @param name Attribute to save to (e.g. "title or "content").
 */
const debouncedSave = createDebounce(
    async (currentNoteID: number, content: string, name: string) => {
        const { data, error } = await supabase
            .from('Note')
            .update({ [name]: content })
            .eq('id', currentNoteID);

        if (error) {
            console.error('Error updating note:', error);
        }
    }, DEBOUNCE);

export const saveNote = async (currentNoteID: number, content: string, name: string) => {
    debouncedSave(currentNoteID, content, name);
}

/**
 * Update the local display of titles (done without debounce).
 * @param title Current note title.
 * @param noteTitles All note titles in the side bar.
 * @param setNoteTitles Setter for all note titles in the side bar.
 * @param titleID Current title ID in local list of titles.
 */
export const updateTitles = (title: string, noteTitles: string[], setNoteTitles: (value: string[]) => void, titleID: number) => {
    const updatedTitles = [...noteTitles];

    if (!title) {
        return;
    }

    if (updatedTitles[titleID] !== title) {
        updatedTitles[titleID] = title;
        setNoteTitles(updatedTitles);
    }
};

export default null;