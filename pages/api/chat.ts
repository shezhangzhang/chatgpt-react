import { NextRequest } from "next/server";
import { Stream } from "../../utils/stream";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const messsages = await req.json();

  const payload = {
    model: process.env.MODEL || "gpt-3.5-turbo",
    messages: messsages,
    stream: true,
  };

  const stream = await Stream(payload);
  return new Response(stream);
}
