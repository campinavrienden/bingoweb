import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

export function RequireAuth({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [_, setAuthError] = useState<string | null>(null);
  const [errorCount, setErrorCount] = useState(0);

  const MAX_ERRORS = 5;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (user) return;
    if (errorCount >= MAX_ERRORS) return;

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).catch((err) => {
      console.error("Popup login failed:", err);
      setErrorCount((c) => c + 1);
      setAuthError(err.message);
    });
  }, [loading, user, errorCount]);

  if (loading || (!user && errorCount < MAX_ERRORS)) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Even geduld…</h2>
        <p>We proberen je automatisch aan te melden.</p>
      </div>
    );
  }

  if (!user && errorCount >= MAX_ERRORS) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login mislukt</h2>
        <p style={{ color: "red" }}>Te veel mislukte loginpogingen.</p>
      </div>
    );
  }

  if (!user.email.endsWith("@campinavrienden.be")) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Geen toegang</h2>
        <p>Dit account behoort niet tot jouw Workspace‑domein.</p>
      </div>
    );
  }

  return <>{children}</>;
}
