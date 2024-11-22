import { supabase } from "~/helper/supabaseClient";
import { Attachment } from "../AttachmentsView/types";

/**
 * Deletes a file from Supabase (and on local display).
 * @param path Raw path to the file.
 * @param attachment Current attachment in list.
 * @param attachments All attachments in list.
 * @param setAttachments Setter for attachments.
 */
export const deleteFile = async (path: string, attachment: Attachment, attachments: Attachment[], setAttachments: (value: Attachment[]) => void) => {
    const index = path.indexOf('notes/') + 'notes/'.length;
    const result = path.substring(index);

    const { error } = await supabase.storage.from("notes").remove([result]);

    if (error) {
        console.log(error);
    } else {
        const updatedAttachments = attachments.filter(att => att.path !== attachment.path);
        setAttachments(updatedAttachments);
    }
}

/**
 * Formats a date from ISO to DD/MM/YYY.
 * @param isoDate Date in ISO format.
 * @returns Formatted date.
 */
export function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export default null;