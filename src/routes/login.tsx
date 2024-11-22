import { createEffect, createSignal } from "solid-js";
import { LM_ALIGN } from "~/consts/style";
import { getSession } from "~/helper/utils";
import AuthButton from "~/components/Login/AuthButton";
import FormInputBox from "~/components/Login/FormInputBox";
import GitHubAuth from "~/components/Login/GitHubAuth";
import WelcomeText from "~/components/Login/WelcomeText";
import { MetaProvider, Title } from "@solidjs/meta";

/**
 * Login form modal, changeable with a registration form.
 * @returns JSX for the login box.
 */
function Login() {
    const session = getSession();

    createEffect(() => {
        if (session) {
            window.location.replace("/"); // user already logged in
        }
    })

    const [register, setRegister] = createSignal(false);
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [error, setError] = createSignal("");

    // conditionally render text in form
    const registerText = () => (register() ? "Login" : "Register");
    const loginText = () => (register() ? "Create an account" : "Login");
    const buttonText = () => (register() ? "Register" : "Login");
    const continueText = () => (register() ? "continue" : "login")

    return (
        <MetaProvider>
            <Title>{buttonText()}</Title>
            <div class={`w-[600px] h-[440px] font-['Open_Sans'] mobile-login:w-full mobile-login:h-full mobile-login:rounded text-thunder items-center flex flex-col gap-2 bg-white absolute ${LM_ALIGN}
            top-1/2 -translate-y-1/2 small:top-6 small:-translate-y-0 small:overflow-auto rounded-2xl outline outline-1 mobile-login:outline-0 outline-gray-300 shadow-md mobile-login:shadow-none`}>
                <span class="absolute right-12 top-6 text-md cursor-pointer select-none mobile-login:right-6 hover:text-bubblegum px-2 py-1 rounded-lg hover:bg-slate-100"
                    onclick={() => setRegister(!register())}>{registerText()}</span>
                <WelcomeText loginText={loginText} />
                <FormInputBox text={"Email"} type={"email"} ref={email} setRef={setEmail} placeholder="email@example.com" />
                <FormInputBox text={"Password"} ref={password} setRef={setPassword} type={"password"} />
                {error() && <span class="text-red-500">{error()}</span>}
                <AuthButton text={buttonText} register={register} email={email} password={password} setError={setError} />
                <GitHubAuth continueText={continueText} setError={setError} />
            </div>
        </MetaProvider>
    )
}

export default Login;