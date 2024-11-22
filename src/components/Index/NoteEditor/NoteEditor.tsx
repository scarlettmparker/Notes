import { createEffect, createSignal, useContext } from "solid-js";
import { TITLE_PLACEHOLDER, CONTENT_PLACEHOLDER } from "~/consts/note";
import { LM_ALIGN } from "~/consts/style";
import { getLocalNote, getNote, saveLocalNote, saveNote, updateTitles } from "./utils";
import { getSession } from "~/helper/utils";
import { SignalContext } from "~/signal-provider";
import NoteEditorProps from "./props";

// components
import TextEditor from "../TextEditor";

/**
 * Note Editor handling the logic of for loading and saving note information.
 * @param currentNoteID ID of the note to save/load.
 * @returns JSX component note editor.
 */
const NoteEditor = ({ currentNoteID, titleID, noteLoaded, setNoteLoaded, noteTitles, setNoteTitles }: NoteEditorProps) => {
    const session = getSession();
    const { title, setTitle, content, setContent, editing, setEditing } = useContext(SignalContext);

    createEffect(() => {
        if (noteTitles()[titleID()] !== title()) {
            updateTitles(title(), noteTitles(), setNoteTitles, titleID());
        }
    });

    // load the note (supabase or local storage)
    createEffect(() => {
        if (!session) {
            getLocalNote(currentNoteID(), setTitle, setContent);
        } else {
            getNote(currentNoteID(), setTitle, setContent, setNoteLoaded);
        }
    });

    // update data either locally or on supabase
    createEffect(() => {
        if (!session) {
            saveLocalNote(currentNoteID(), title(), "title");
        } else {
            noteLoaded() && saveNote(currentNoteID(), title(), "title");
        }
    });

    createEffect(() => {
        if (!session) {
            saveLocalNote(currentNoteID(), content(), "content");
        } else {
            (noteLoaded() && editing()) && saveNote(currentNoteID(), content(), "content");
        }
    });

    return (
        <div class={`relative flex flex-col w-[80%] ${LM_ALIGN}`}>
            <TextEditor style="relative text-3xl font-semibold placeholder:font-normal" placeholder={TITLE_PLACEHOLDER}
                content={title} setContent={(value) => { setTitle(value); setEditing(true); }} onBlur={() => setEditing(false)} />
            <TextEditor style="text-m textarea-with-guidelines" placeholder={CONTENT_PLACEHOLDER} content={content}
                setContent={(value) => { setContent(value); setEditing(true); }} onBlur={() => setEditing(false)} />
        </div>
    );
};


export default NoteEditor;