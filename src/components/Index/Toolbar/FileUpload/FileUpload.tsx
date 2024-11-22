import { Accessor, createSignal } from "solid-js";
import { SIZE, DIV_SIZE } from "../consts";
import { handleFileChange } from "./utils";

// components
import HoverableIcon from "../HoverableIcon";

/**
 * File upload JSX element.
 * @param userId User UUID (to locate files).
 * @param currentNoteID Current note ID getter.
 * @returns JSX element containing hoverable icon allowing users to upload files.
 */
const FileUpload = ({ userId, currentNoteID }: { userId: string, currentNoteID: Accessor<number> }) => {
    const FILE_NAME = "/assets/upload.png";
    const FILE_HOVER = "/assets/upload_hover.png";

    const SUCCESS_TIMER = 5000; // length of success message display
    const [uploadSuccessful, setUploadSuccessful] = createSignal("");

    let fileInput: HTMLInputElement | undefined;

    const triggerFileInputClick = () => {
        fileInput?.click();
    };

    return (
        <>
            <HoverableIcon src={FILE_NAME} hover={FILE_HOVER} alt={"Upload File"} size={SIZE} divSize={DIV_SIZE} onClick={triggerFileInputClick} successMessage={uploadSuccessful} />
            <input ref={fileInput} type="file" class="hidden" onChange={(e) => handleFileChange(e, userId, currentNoteID, setUploadSuccessful, SUCCESS_TIMER)} />
        </>
    )
}

export default FileUpload;