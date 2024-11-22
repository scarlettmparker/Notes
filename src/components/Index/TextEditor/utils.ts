export const autogrow = (e: HTMLTextAreaElement) => {
    e.style.height = "0px";
    e.style.height = (e.scrollHeight) + "px";
}

export default null;