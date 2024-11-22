import { MetaProvider, Title } from "@solidjs/meta";
import { createEffect, createSignal, onMount } from "solid-js";
import { auth, manageLogin } from "~/helper/utils";
import { SignalProvider } from "~/signal-provider";

// components
import NotesWrapper from "~/components/Index/NotesWrapper";

function Home() {
  const [session, setSession] = createSignal<any>();

  onMount(() => {
    auth((newSession) => {
      setSession(newSession);
      localStorage.setItem('session', JSON.stringify(session()));
    });
  });

  createEffect(() => {
    manageLogin(session);
  })

  return (
    <MetaProvider>
      <Title>Notes</Title>
      <SignalProvider>
        <NotesWrapper />
      </SignalProvider>
    </MetaProvider>
  )
}

export default Home;