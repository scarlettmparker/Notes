import { Accessor } from "solid-js";
import { signInWithGithub } from "~/helper/utils";

/**
 * GitHub authentication modal.
 * @param continueText Text dependant on register/login state.
 * @param setError Setter for error messages.
 * @returns JSX for the GitHub authentication modal.
 */
const GitHubAuth = ({ continueText, setError }: { continueText: Accessor<string>, setError: (value: string) => void }) => {
    return (
        <span class="relative text-lg bottom-3 cursor-pointer select-none hover:text-bubblegum px-2 py-1 rounded-lg hover:bg-slate-100" onclick={() => signInWithGithub(setError)}>
            Or {continueText()} with <span class="font-semibold">Github</span>
        </span>
    );
}

export default GitHubAuth;