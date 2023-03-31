import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import * as Sentry from "@sentry/nextjs";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { DarkContext } from "../utils/darkContext";

Sentry.init({
  dsn: "https://e32d11752c834633822a2b84a00f4d25@o361140.ingest.sentry.io/4504841207021568",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

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
          <div className="text-slate-900 dark:text-slate-100 min-h-screen dark:bg-slate-900">
            <Header dark={dark} setDark={setDark} />
            <main className="flex mx-auto flex-col items-center">
              <Component {...pageProps} />
            </main>
          </div>
        </DarkContext.Provider>
      </div>
      <Analytics />
    </>
  );
}
