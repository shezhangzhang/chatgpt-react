import { useRouter } from "next/router";
import React, { useState } from "react";

export const LOGIN_CK = "LOGIN_CK_GPT";

export default function Login() {
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    if (!input) return;

    try {
      setLoading(true);
      const res = await fetch(`${location.origin}/api/login?password=${input}`);
      if (!res.ok) {
        throw Error(res.statusText);
      }

      const data = await res.json();
      if (data && data?.result) {
        localStorage.setItem(LOGIN_CK, window.btoa(input));
        router.replace("/");
      } else {
        setInput("");
        setIsError(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="mt-24 w-3/4 max-w-sm text-center">
      <div className="text-left">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-5 mb-1 w-full rounded-md border-2 border-gray-300 p-3 shadow-sm focus:border-black focus:outline-0 dark:border-gray-700 dark:bg-slate-900 dark:focus:border-gray-600"
          placeholder={"Ask me for the password. "}
          type="password"
        />
        <span className="text-sm font-bold text-red-500">
          {isError ? <div>wrong password.</div> : ""}
        </span>
      </div>
      <button
        className={`mt-5 h-10 w-40 rounded-md bg-black font-medium text-white hover:bg-black/80 ${
          loading ? "animate-pulse" : ""
        }`}
        onClick={handleLogin}
        disabled={loading}
      >
        GO
      </button>
    </div>
  );
}
