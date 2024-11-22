import FormInputBoxProps from "./props";

/**
 * 
 * @param text Text displayed above the input box.
 * @param type Input box type (e.g. password, email).
 * @param ref Accessor to a string for updating values.
 * @param setRef Setter to a string for updating values.
 * @param placeholder Placeholder text for the input.
 * @returns JSX of styled input box for a form.
 */
const FormInputBox = ({ text, type, ref, setRef, placeholder }: FormInputBoxProps) => {
    const handleInput = (event: InputEvent) => {
        const target = event.target as HTMLInputElement;
        if (setRef) {
            setRef(target.value);
        }
    };

    return (
        <div class="flex flex-col w-[65%] mobile-login:w-[80%] ">
            <span class="relative text-lg font-medium">{text}</span>
            <input placeholder={placeholder} value={ref ? ref() : ""} onInput={handleInput} class="border border-gray-300 focus:border-gray-600 focus:outline-none pl-1.5 py-1 rounded-md" type={type} />
        </div>
    )
}

export default FormInputBox;