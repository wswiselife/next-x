import serverAuth from "@/libs/serviceAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).end;
    }

    try {
        // 获取session,得到当前用户信息
        const { currentUser } = await serverAuth(req);

        return res.status(200).json(currentUser);
    } catch (error) {
        console.log("error", error);
        return res.status(400).end();
    }
}
