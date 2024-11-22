import { BUTTON_STYLE, LM_ALIGN } from "~/consts/style";
import { createLocalNote, createNote } from "./utils";
import { createEffect, createSignal } from "solid-js";
import { getSession } from "~/helper/utils";
import NotesMenuProps from "./props";

// components
import NoteList from "../NotesList";
import WelcomeText from "../WelcomeText";

/**
 * Left side notes menu in the UI.
 * A lot of these props are here due to prop drilling, understandably this makes the code
 * a bit less readable, but given the limited time-frame I don't have time to re-format it all.
 * 
 * @param noteIDs Getter for all currently loaded note IDs.
 * @param noteTitles Getter for all currently loaded note titles.
 * @param newNoteID Newest possible note ID (when user creates a new note).
 * @param setTitleID Setter for the title ID in the UI (for live-updating UI).
 * @param currentNoteID Getter for the ID of the currently visible note.
 * @param setCurrentNoteID Setter for the ID of the currently visible note 
 * @param setNoteMenuData Setter for all the current menu data (mainly titles but also IDs).
 * @param setNoteLoaded Setter to determine if note has loaded or not.
 * @returns JSX element for the notes menu.
 */
const NotesMenu = ({ noteIDs, noteTitles, newNoteID, setTitleID, currentNoteID, setCurrentNoteID, setNoteMenuData, setNoteLoaded }: NotesMenuProps) => {
    const session = getSession();
    const [username, setUsername] = createSignal("");

    createEffect(() => {
        if (session) {
            setUsername(session.user.email.split("@")[0]);
        }
    })

    // handler for create note button (supabase on auth)
    const handleNoteButton = () => {
        if (session) {
            createNote(setCurrentNoteID, setNoteMenuData);
        } else {
            createLocalNote(setCurrentNoteID, newNoteID, setNoteMenuData);
        }
    }

    return (
        <div class="relative w-96 thin-1:w-[340px] mobile-menu-full:w-full h-full bg-slate-50 rounded-l-xl font-['Open_Sans'] border-r-1 border mobile-full:border-0 mobile-full:rounded">
            <div class="flex flex-col gap-4 h-full w-full">
                <WelcomeText username={username} />
                {noteIDs().length > 0 ?
                    <NoteList noteIDs={noteIDs} noteTitles={noteTitles} setTitleID={setTitleID} currentNoteID={currentNoteID} setCurrentNoteID={setCurrentNoteID} setNoteLoaded={setNoteLoaded} />
                    : <span class="w-full text-center">Create some notes!</span>
                }
                <button id="click-ignore" class={`${BUTTON_STYLE} w-60 h-[48px] mobile-full:w-40 mobile-menu-full:w-[80%] ${LM_ALIGN}`} onclick={() => {
                    handleNoteButton();
                }}>New Note</button>
            </div>
        </div>
    )
}

export default NotesMenu