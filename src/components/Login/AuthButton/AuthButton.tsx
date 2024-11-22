import { BUTTON_STYLE } from "~/consts/style";
import { signUp, signIn } from "~/helper/utils";
import AuthProps from "./props";

/**
 * Authentication button that either signs up/signs in the user on click.
 * @param text Text dependant on register/login state.
 * @param email The user's email.
 * @param password The user's password.
 * @param setError Setter for error messages.
 * @returns JSX for the authentication button
 */
const AuthButton = ({ text, register, email, password, setError }: AuthProps) => {
    return (
        <button class={`${BUTTON_STYLE} w-[65%] mobile-login:w-[80%] h-10 text-lg mt-1`} onclick={() => {
            register() ? signUp(email(), password(), setError) : signIn(email(), password(), setError);
        }}>{text()}</button>
    )
}

export default AuthButton;