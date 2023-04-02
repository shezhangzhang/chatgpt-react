import { NextRequest, NextResponse } from "next/server";
import { ChatGPTMessage, Stream } from "../../utils/stream";

export const config = {
  runtime: "edge",
};

interface Body {
  messsages: ChatGPTMessage[];
  password: string;
}

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body: Body = await req.json();

  const passwords = process.env.PASSWORD?.split(",");
  if (!body?.password || !passwords || !passwords.includes(body.password)) {
    return new Response("Not Login", { status: 401 });
  }

  const payload = {
    model: process.env.MODEL || "gpt-3.5-turbo",
    messages: body.messsages,
    stream: true,
  };

  const stream = await Stream(payload);
  return new Response(stream);
}
