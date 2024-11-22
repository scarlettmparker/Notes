import { LM_ALIGN } from "~/consts/style";
import { getSession } from "~/helper/utils";
import { useContext } from "solid-js";
import { SignalContext } from "~/signal-provider";
import NoteEditorWrapperProps from "./props";

// components
import Attachments from "../Toolbar/Attachments";
import NoteEditor from "../NoteEditor";
import Delete from "../Toolbar/Delete";
import FileUpload from "../Toolbar/FileUpload";

/**
 * Note Editor wrapper component for selected/non-selected note display.
 * @param currentNoteID Note ID (-1 for no note selected).
 * @returns JSX note editor wrapper.
 */
const NoteEditorWrapper = ({ currentNoteID, setCurrentNoteID, titleID, noteLoaded, setNoteLoaded, noteTitles, setNoteTitles, noteIDs, setNoteIDs }: NoteEditorWrapperProps) => {
    const session = getSession();
    const { menuOpen } = useContext(SignalContext);

    return (
        <div id="click-ignore" class={`w-3/4 ${menuOpen() ? 'mobile-menu-full:hidden' : 'w-full'}`}>
            <div class="relative overflow-y-auto h-5/6 mt-16 w-[90%] mobile-menu-full:w-full scrollbar text-height:h-[400px] left-[47.5%] mobile-menu-full:left-1/2 -transform -translate-x-1/2 font-['Open_Sans']">
                {currentNoteID() >= 0 ? (
                    <NoteEditor currentNoteID={currentNoteID} titleID={titleID} noteLoaded={noteLoaded} setNoteLoaded={setNoteLoaded} noteTitles={noteTitles} setNoteTitles={setNoteTitles} />
                ) : (
                    <span class={`relative flex w-[80%] text-m ${LM_ALIGN}`}>Select or create a note to get started.</span>
                )}
            </div>
            {currentNoteID() >= 0 &&
                <div class="absolute flex flex-row right-[10%] mobile-menu-full:right-0 mobile-menu-full:left-1/2 mobile-menu-full:-translate-x-1/2 mobile-menu-full:w-fit mobile-menu-full:absolute bottom-8 gap-2">
                    {session && <FileUpload userId={session.user.id} currentNoteID={currentNoteID} />}
                    {session && <Attachments userId={session.user.id} currentNoteID={currentNoteID} />}
                    <Delete currentNoteID={currentNoteID} setCurrentNoteID={setCurrentNoteID} titleID={titleID}
                        noteTitles={noteTitles} setNoteTitles={setNoteTitles} noteIDs={noteIDs} setNoteIDs={setNoteIDs} />
                </div>
            }
        </div>
    );
};

export default NoteEditorWrapper;