import { Accessor } from "solid-js";
import { Attachment } from "../AttachmentsView/types";

export default interface AttachmentModalProps {
    attachmentID: Accessor<number | null>;
    setAttachmentID: (value: number | null) => void;
    altText: Accessor<string>;
    attachment: Attachment;
    attachments: Accessor<Attachment[]>;
    setAttachments: (value: Attachment[]) => void;
    setAltText: (value: string) => void;
}