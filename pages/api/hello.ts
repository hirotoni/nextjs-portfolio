import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ text: "Hello" });
}
