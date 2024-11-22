import { formatDate, deleteFile } from "./utils";
import AttachmentModalProps from "./props";

// components
import AltText from "../AltText";

const AttachmentModal = ({ attachmentID, setAttachmentID, altText, attachment, attachments, setAttachments, setAltText }: AttachmentModalProps) => {
    return (
        <div class="relative flex flex-row items-center w-full z-index-20">
            {(attachmentID() == attachment.id && altText()) && <AltText alt={altText()} style="bottom-[-100%] left-[46.5%]" />}
            <a href={attachment.path} target="_blank" class="relative text-thunder hover:text-bubblegum w-fit text-sm px-2 py-1 rounded-lg hover:bg-slate-100"
                onmouseover={() => { setAltText("Uploaded: " + formatDate(attachment.updatedAt)); setAttachmentID(attachment.id!) }}
                onmouseleave={() => { setAltText(""); setAttachmentID(null); }}>{attachment.title}</a>
            <span class="absolute text-sm right-2 top-0.5 select-none cursor-pointer text-thunder hover:text-bubblegum
                w-fit text-sm px-2 py-1 rounded-lg hover:bg-slate-100" onClick={async () => await deleteFile(attachment.path, attachment, attachments(), setAttachments)}>X</span>
        </div>
    )
}

export default AttachmentModal;