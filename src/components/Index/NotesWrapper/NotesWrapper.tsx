import { createEffect, createSignal, onMount, useContext } from "solid-js";
import { createClickOutside, getLocalNoteTitles, handleClickOutside, setLocalNoteMenuData, setNoteMenuData } from "./utils";
import { LM_ALIGN } from "~/consts/style";
import { NO_NOTE } from "~/consts/note";
import { getSession, signOut } from "~/helper/utils";
import { subscribeChanges } from "../NoteEditor/supabaseutils";
import { SignalContext } from "~/signal-provider";

// components
import NoteEditorWrapper from "../NoteEditorWrapper";
import NotesMenu from "../NotesMenu";

/**
 * Main wrapper for the notes app.
 * @param session User session, for interactions with Supabase.
 * @returns JSX of notes app.
 */

const NotesWrapper = () => {
    const session = getSession();

    const [currentNoteID, setCurrentNoteID] = createSignal(NO_NOTE);
    const [noteIDs, setNoteIDs] = createSignal<number[]>([]);
    const [newNoteID, setNewNoteID] = createSignal(1);
    const [noteTitles, setNoteTitles] = createSignal<string[]>([]);
    const [loadedData, setLoadedData] = createSignal(false);
    const [noteLoaded, setNoteLoaded] = createSignal(false);
    const [titleID, setTitleID] = createSignal(-1);
    const { menuOpen, setMenuOpen, setContent, editing } = useContext(SignalContext);

    const loginStyle = "absolute right-12 top-4 px-2 py-1 rounded-lg hover:bg-slate-100 text-thunder hover:text-bubblegum select-none cursor-pointer mobile-menu-full:right-6";

    // setting note data on load
    onMount(() => {
        if (!session && noteIDs().length === 0) {
            setLocalNoteMenuData(setNoteIDs, setNewNoteID, setNoteTitles);
        }

        // dynamically update note data on supabase changes
        const noteChannel = subscribeChanges(noteTitles, setNoteTitles, noteIDs, setNoteIDs, currentNoteID, titleID, setNewNoteID, setContent, editing);
    })

    createEffect(() => {
        if (session && noteIDs().length == 0 && !loadedData()) {
            setNoteMenuData(setNoteIDs, setNewNoteID, setNoteTitles, session);
            setLoadedData(true);
        }
        createClickOutside((e) => handleClickOutside(e, setCurrentNoteID));
    })

    createEffect(() => {
        if (!session && noteIDs().length === 0) {
            setNoteTitles(getLocalNoteTitles(noteIDs()));
        }
    });

    createEffect(() => {
        if (currentNoteID() != NO_NOTE) {
            setMenuOpen(false);
        }
    });

    // clear local data entries when session is found
    createEffect(() => {
        if (session && !loadedData()) {
            setNoteIDs([]);
            setNoteTitles([]);
            setCurrentNoteID(-1);
        }
    })

    const handleSetMenuData = () => {
        if (session) {
            setNoteMenuData(setNoteIDs, setNewNoteID, setNoteTitles, session);
        } else {
            setLocalNoteMenuData(setNoteIDs, setNewNoteID, setNoteTitles);
        }
    }

    return (
        <div class={`absolute top-1/2 ${LM_ALIGN} -translate-y-1/2 w-11/12 h-9/10 mobile-full:w-full mobile-full:h-full min-h-[480px] bg-white rounded-xl mobile-full:rounded
            flex flex-row overflow-hidden small:top-0 small:mt-2 small:translate-y-0 outline outline-1 mobile-full:outline-0 outline-gray-300 shadow-md`}>
            {menuOpen() ?
                <NotesMenu noteIDs={noteIDs} noteTitles={noteTitles} newNoteID={newNoteID} setTitleID={setTitleID}
                    currentNoteID={currentNoteID} setCurrentNoteID={setCurrentNoteID} setNoteLoaded={setNoteLoaded} setNoteMenuData={() => handleSetMenuData()} />
                : <span id="click-ignore" class="absolute left-6 top-4 px-2 py-1 rounded-lg hover:bg-slate-100 text-thunder hover:text-bubblegum select-none cursor-pointer" onclick={() => { setMenuOpen(true) }}>Open Notes</span>
            }
            <NoteEditorWrapper currentNoteID={currentNoteID} setCurrentNoteID={setCurrentNoteID} titleID={titleID} noteLoaded={noteLoaded}
                setNoteLoaded={setNoteLoaded} noteTitles={noteTitles} setNoteTitles={setNoteTitles} noteIDs={noteIDs} setNoteIDs={setNoteIDs} />
            {loadedData() ?
                <span id="click-ignore" class={loginStyle} onclick={() => signOut()}>Log out</span> :
                <span id="click-ignore" class={loginStyle} onclick={() => { window.location.href = '/login'; }}>Log in</span>
            }
        </div>
    )
}

export default NotesWrapper;