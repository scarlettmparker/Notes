import { truncate } from "~/components/Index/NotesMenu/utils";
import { supabase } from "~/helper/supabaseClient";
import { Attachment } from "./types";

/**
 * Gets the attachments for a note from Supabase.
 * @param userId User UUID (this is where the files are located).
 * @param noteID Current note ID.
 * @returns Attachment array containing title and path to file.
 */
export const getNoteAttachments = async (userId: string, noteID: number) => {
    try {
        const { data, error } = await supabase.storage
            .from('notes')
            .list(`${userId}/${noteID}`, { offset: 0 });

        if (error) {
            console.error('Error fetching files:', error);
            return [];
        }

        // map the file data to return only the file name and the link
        let attachmentId = 0;
        const links: Attachment[] = data.map((file) => {
            const link = supabase.storage
                .from('notes')
                .getPublicUrl(`${userId}/${noteID}/${file.name}`).data.publicUrl;
            
            attachmentId += 1;
            return {
                id: attachmentId,
                title: truncate(file.name, 14) || file.name,
                path: link,
                updatedAt: file.updated_at
            };
        });

        return links;
    } catch (err) {
        console.error('Unexpected error:', err);
        return [];
    }
};

export default null;