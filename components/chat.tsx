import React, { useContext, useEffect, useRef, useState } from "react";
import { Conversation, ROLES } from "../pages";
import Role from "./role";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { monoBlue } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { DarkContext } from "../utils/darkContext";
import remarkGfm from "remark-gfm";
import CopyBtn from "./copyBtn";

interface Props {
  conversations: Conversation[];
  saving: boolean;
}

export default function Chat(props: Props) {
  const { conversations, saving } = props;
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const copyRef = useRef<null | HTMLDivElement>(null);
  const touchYRef = useRef(0);
  const dark = useContext(DarkContext);

  useEffect(() => {
    if (bottomRef.current && conversations.length > 2) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [conversations]);

  function handleTochMove(e: TouchEvent) {
    const touchY = e.touches[0].clientY;
    if (touchY > touchYRef.current) {
      bottomRef.current = null;
    }
    touchYRef.current = touchY;
  }

  function handleWheelEvent(e: WheelEvent) {
    if (e.deltaY < 0) {
      bottomRef.current = null;
    }
  }

  useEffect(() => {
    copyRef.current = bottomRef.current;
  }, []);

  useEffect(() => {
    bottomRef.current = copyRef.current;
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      document.addEventListener("touchmove", handleTochMove);
    } else {
      document.addEventListener("wheel", handleWheelEvent);
    }

    return () => {
      document.removeEventListener("touchmove", handleTochMove);
      document.removeEventListener("wheel", handleWheelEvent);
    };
  }, [conversations.length]);

  return (
    <div
      className="w-full max-w-5xl text-left font-sans leading-tight dark:text-slate-200"
      ref={bottomRef}
      id="save-as-image"
    >
      {conversations && conversations.length > 1
        ? conversations
            .filter((item: Conversation) => item.role !== ROLES.SYSTEM)
            .map((item: Conversation, index: number) => {
              return (
                <div
                  key={index}
                  className={`w-full px-4 py-5 text-slate-100 ${
                    item.role === ROLES.USER
                      ? "bg-white text-slate-800 dark:bg-slate-700 dark:text-slate-100"
                      : "bg-gray-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                  }`}
                >
                  <div className="flex items-start">
                    <Role role={item.role} />
                    <ReactMarkdown
                      className={`ml-2 flex-grow overflow-x-auto overflow-y-hidden whitespace-pre-wrap ${
                        item.content.startsWith("ERROR MESSAGE:")
                          ? "text-red-500"
                          : ""
                      }`}
                      linkTarget="_blank"
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline ? (
                            <div className="relative">
                              <SyntaxHighlighter
                                //@ts-ignore
                                style={dark ? atomOneDark : monoBlue}
                                language={match ? match[1] : ""}
                                PreTag="div"
                                showLineNumbers
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>

                              {!saving && (
                                <div className="absolute right-0 top-1 mr-1 cursor-pointer rounded bg-slate-50 p-1 dark:bg-slate-700">
                                  <CopyBtn
                                    text={String(children).replace(/\n$/, "")}
                                    dark={dark}
                                  />
                                </div>
                              )}
                            </div>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {item.content.replace(/^\s+/, "").replace(/\n\n/g, "\n")}
                    </ReactMarkdown>

                    {!saving && (
                      <div className="ml-1 mr-2 cursor-pointer">
                        <CopyBtn
                          text={item.content
                            .replace(/^\s+/, "")
                            .replace(/\n\n/g, "\n")}
                          dark={dark}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
        : ""}
    </div>
  );
}
