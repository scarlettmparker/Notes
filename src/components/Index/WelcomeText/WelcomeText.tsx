import { Accessor } from "solid-js";
import { LM_ALIGN } from "~/consts/style";

/**
 * @param username Getter for the username (truncated email).
 * @returns JSX element for welcome text.
 */
const WelcomeText = ({ username }: { username: Accessor<string> }) => {
    return (
        <>
            <span class="text-lg ml-6 mt-[18px]">{`Hello, ${username() ? username() : "guest"}`}</span>
            <hr class={`relative w-5/6 ${LM_ALIGN}`} />
        </>
    )
}

export default WelcomeText;