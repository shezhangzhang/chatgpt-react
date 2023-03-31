import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;

  if (method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (query?.password) {
    const passwords = process.env.PASSWORD?.split(",");
    if (passwords && passwords.includes(query.password.toString())) {
      res.status(200).json({ result: true });
    } else {
      res.status(200).json({ result: false });
    }
  } else {
    res.status(200).json({ result: false });
  }
}
