import { Accessor, createSignal } from "solid-js";
import { SIZE, DIV_SIZE } from "../consts";

// components
import HoverableIcon from "../HoverableIcon";
import AttachmentsView from "../AttachmentsView";

/**
 * View Attachments JSX element.
 * @param userId User UUID (to locate files).
 * @param currentNoteID Current note ID getter.
 * @returns JSX of the hoverable attachments image.
 */
const Attachments = ({ userId, currentNoteID }: { userId: string, currentNoteID: Accessor<number> }) => {
    const FILE_NAME = "/assets/attachments.png";
    const FILE_HOVER = "/assets/attachments_hover.png";
    const [viewAttachments, setViewAttachments] = createSignal(false);

    return (
        <div class="relative">
            {viewAttachments() && <AttachmentsView userId={userId} currentNoteID={currentNoteID} />}
            <HoverableIcon src={FILE_NAME} hover={FILE_HOVER} alt={"Attachments"} size={SIZE} divSize={DIV_SIZE} onClick={() => { setViewAttachments(!viewAttachments()) }} />
        </div>
    )
}

export default Attachments;