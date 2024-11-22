import { Accessor, createSignal, onMount } from "solid-js";
import { LM_ALIGN } from "~/consts/style";
import { Attachment } from "./types";
import { getNoteAttachments } from "./utils";

/**
 * JSX element for viewing attachments
 * @param userId User UUID (to locate files).
 * @param currentNoteID Current note ID getter.
 * @returns List of clickable attachments for the current note.
 */
const AttachmentsView = ({ userId, currentNoteID }: { userId: string, currentNoteID: Accessor<number> }) => {
    const [attachments, setAttachments] = createSignal<Attachment[]>([]);

    onMount(async () => {
        const links = await getNoteAttachments(userId, currentNoteID());
        setAttachments(links);
    })

    return (
        <div class={`absolute w-48 h-60 bg-white z-10 bottom-8 outline outline-1 outline-gray-200 shadow-sm rounded-md ${LM_ALIGN} text-thunder`}>
            <div class="relative left-3 top-2 flex flex-col font-['Open_Sans'] h-[95%] w-fit">
                <span class="mb-1 font-regular">Attachments</span>
                <div class="h-full flex flex-col scrollbar overflow-y-scroll overflow-x-hidden" >
                    {attachments().map((attachment) => (
                        <a href={attachment.path} target="_blank" class="relative text-thunder hover:text-bubblegum w-fit text-sm px-2 py-1 rounded-lg hover:bg-slate-100" >
                            {attachment.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AttachmentsView;