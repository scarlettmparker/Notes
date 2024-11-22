import { Accessor, createSignal, onMount } from "solid-js";
import { LM_ALIGN } from "~/consts/style";
import { Attachment } from "./types";
import { getNoteAttachments } from "./utils";

// components
import AttachmentModal from "../AttachmentModal";

/**
 * JSX element for viewing attachments
 * @param userId User UUID (to locate files).
 * @param currentNoteID Current note ID getter.
 * @returns List of clickable attachments for the current note.
 */
const AttachmentsView = ({ userId, currentNoteID }: { userId: string, currentNoteID: Accessor<number> }) => {
    const [attachments, setAttachments] = createSignal<Attachment[]>([]);
    const [altText, setAltText] = createSignal("");
    const [attachmentID, setAttachmentID] = createSignal<number | null>(null);

    onMount(async () => {
        const links = await getNoteAttachments(userId, currentNoteID());
        setAttachments(links);

    })

    return (
        <div class={`absolute w-48 h-60 bg-white z-10 bottom-8 outline outline-1 outline-gray-200 shadow-sm rounded-md ${LM_ALIGN} text-thunder`}>
            <div class="relative pl-3 top-2 flex flex-col font-['Open_Sans'] h-[95%] w-full">
                <span class="mb-1 font-regular">Attachments</span>
                <div class="h-full flex flex-col scrollbar overflow-y-scroll overflow-x-hidden w-full z-index-20" >
                    {attachments().map((attachment) => (
                        <AttachmentModal attachmentID={attachmentID}
                        setAttachmentID={setAttachmentID} altText={altText}
                        attachment={attachment} attachments={attachments} setAttachments={setAttachments} setAltText={setAltText} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AttachmentsView;