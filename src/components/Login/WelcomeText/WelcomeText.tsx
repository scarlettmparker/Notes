import { Accessor } from "solid-js";

/**
 * Welcome text modal.
 * @param loginText Text dependant on register/login state.
 * @returns JSX for the welcome text modal.
 */
const WelcomeText = ({ loginText }: { loginText: Accessor<string> }) => {
    return (
        <div class="flex flex-col items-center relative mt-16 mb-2">
            <span class="text-4xl font-semibold ">{loginText()}</span>
            <span class="text-lg mobile-login:text-base mobile-login:mt-1">Enter your details below to {loginText().toLowerCase()}</span>
        </div>
    )
}

export default WelcomeText;