import { Accessor } from "solid-js";
import { supabase } from "./supabaseClient";

/**
 * Helper function to debounce a function call
 * @param fun Function to debounce.
 * @param delay Debounce delay in ms.
 * @returns Debounced function with a delayed invoke.
 */
export const createDebounce = (fun: (...args: any[]) => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fun(...args), delay);
    };
};

/**
 * Sets up an authentication state listener and updates the user session.
 * @param setSession Sets/updates the user session.
 * @returns Cleanup function to unsubscribe from the listener.
 */
export const auth = (setSession: (value: any) => void) => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
        (event: any, session: any) => {
            setSession(session);
        }
    );

    return () => {
        authListener?.subscription.unsubscribe();
    };
}

/**
 * Gets the session from local storage.
 * @returns User session or null.
 */
export const getSession = () => {
    if (typeof window !== "undefined") {
        const session = localStorage.getItem('session');
        return session ? JSON.parse(session) : null;
    }
    return null;
};

/**
 * Signs the user out using supabase auth.
 */
export const signOut = async () => {
    await supabase.auth.signOut();
    window.location.replace("/");
};

/**
 * Creates a new user account using Supabase auth.
 * @param email The user's email.
 * @param password The user's password.
 * @param setError Setter for error messages.
 */
export async function signUp(email: string, password: string, setError: (value: string) => void) {
    const { error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) {
        setError(error.message);
    } else {
        window.location.href = '/?onboarding=true';
    }
}

/**
 * Signs the user in using Supabase auth.
 * @param email The user's email.
 * @param password The user's password.
 * @param setError Setter for error messages.
 */
export async function signIn(email: string, password: string, setError: (value: string) => void) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        setError(error.message);
    } else {
        window.location.href = '/?signin=true';
    }
}

/**
 * Signs the user in with GitHub using Supabase' OAuth.
 * @param setError Setter for error messages.
 */
export async function signInWithGithub(setError: (value: string) => void) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: "http://localhost:3000?signin=true"
        }
    });

    if (error) {
        setError(error.message);
    }
}

/**
 * Manage logging in on the client side for registration and OAuth.
 * @param session The current user's session.
 */
export const manageLogin = (session: Accessor<any>) => {
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const signin = urlParams.get('signin');

        if (signin == "true" && (session() && session().user.id)) {
            window.location.href = '/';
        }
    }
}

export default null;