import { useRouter } from "next/router";
import React, { useState } from "react";

export const LOGIN_CK = "LOGIN_CK_GPT";

export default function Login() {
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();

  async function handleLogin() {
    if (!input) return;

    try {
      setLoading(true);
      setIsError(false);
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
        setErrMsg("wrong password.");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setIsError(true);
      setErrMsg(`Something was wrong: ${error}`);
    }
  }

  function handleKeyDown(event: any) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    }
  }

  return (
    <div className="mt-24 w-3/4 max-w-sm text-center">
      <div className="text-left">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mb-1 mt-5 w-full rounded-md border-2 border-gray-300 p-3 shadow-sm focus:border-black focus:outline-0 dark:border-gray-700 dark:bg-slate-900 dark:focus:border-gray-600"
          placeholder={"Ask me for the password. "}
          type="password"
          onKeyDown={handleKeyDown}
        />
        <span className="text-sm font-bold text-red-500">
          {isError ? errMsg : ""}
        </span>
      </div>
      <button
        className={`mt-5 h-10 w-40 rounded-md bg-black font-medium text-white hover:bg-black/80 ${
          loading ? "animate-pulse" : ""
        }`}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Waiting" : "GO"}
      </button>
    </div>
  );
}
