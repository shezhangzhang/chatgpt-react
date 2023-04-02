import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { DarkContext } from "../utils/darkContext";
// import * as Sentry from "@sentry/nextjs";

// GO: https://sentry.io/
// Sentry.init({
//   dsn: "your_own_sentry_dsn",
//   tracesSampleRate: 1.0,
// });

const DARK_MODE = "DARK";

export default function App({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem(DARK_MODE);
    if (darkMode) {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(DARK_MODE, dark ? "dark" : "");
  }, [dark]);

  return (
    <>
      <div className={`${dark ? "dark" : ""}`}>
        <DarkContext.Provider value={dark}>
          <div className="min-h-screen text-slate-900 dark:bg-slate-900 dark:text-slate-100">
            <Header dark={dark} setDark={setDark} />
            <main className="mx-auto flex flex-col items-center">
              <Component {...pageProps} />
            </main>
          </div>
        </DarkContext.Provider>
      </div>
      <Analytics />
    </>
  );
}
