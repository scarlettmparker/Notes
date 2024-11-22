import { SIZE, DIV_SIZE } from "../consts";
import { deleteNote } from "./utils";
import DeleteProps from "./props";

// components
import HoverableIcon from "../HoverableIcon";
import { useContext } from "solid-js";
import { SignalContext } from "~/signal-provider";

/**
 * Delete JSX element in the controls section.
 * @returns JSX element for delete controls.
 */
const Delete = ({ currentNoteID, setCurrentNoteID, titleID, noteTitles, setNoteTitles, noteIDs, setNoteIDs }: DeleteProps) => {
    const { setMenuOpen } = useContext(SignalContext);
    const FILE_NAME = "/assets/delete.png";
    const FILE_HOVER = "/assets/delete_hover.png";

    return (
        <HoverableIcon src={FILE_NAME} hover={FILE_HOVER} alt={"Delete Note"} size={SIZE} divSize={DIV_SIZE} onClick={
            async () => {
                await deleteNote(currentNoteID(), setCurrentNoteID, noteIDs, setNoteIDs, titleID, noteTitles, setNoteTitles)
                setMenuOpen(true);
            }
        } />
    )
}

export default Delete;