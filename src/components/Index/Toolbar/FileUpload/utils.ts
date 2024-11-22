import { Accessor } from "solid-js";
import { supabase } from "~/helper/supabaseClient";

/**
 * Handles file change event for uploading files to Supabase.
 * @param event Change event triggered by FileUpload element.
 * @param userId User UUID (to locate files).
 * @param currentNoteID Current note ID getter.
 * @param setUploadSuccessful Setter for updating the UI success message.
 * @param SUCCESS_TIMER The time in ms after which the success message is cleared.
 */
export const handleFileChange = async (event: Event, userId: string, currentNoteID: Accessor<number>, setUploadSuccessful: (value: string) => void, SUCCESS_TIMER: number) => {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
        // sanitization based on s3 safe characters (supabase)
        // https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
        const sanitizedFileName = file.name.replace(/[^A-Za-z0-9_\/!.\*'()&$@=;:+,?]/g, '_');
        const encodedFileName = encodeURIComponent(sanitizedFileName);
        
        const filePath = `${userId}/${currentNoteID()}/${encodedFileName}`;
        const { data, error } = await supabase.storage
            .from('notes')
            .upload(filePath, file);

        if (error) {
            console.error('Error uploading file:', error);
        } else {
            setUploadSuccessful("File uploaded successfully");
            setTimeout(() => { setUploadSuccessful(""); }, SUCCESS_TIMER);
        }
    }
};

export default null;