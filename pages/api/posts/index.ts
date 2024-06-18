import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST" && req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        if (req.method === "POST") {
            // 原处理
            // const { currentUser } = await serverAuth(req);

            const { body, currentUser } = req.body;
            console.log("currentUser", currentUser.id);

            const post = await prisma.post.create({
                data: {
                    body,
                    userId: currentUser.id,
                },
            });

            return res.status(200).json({ post });
        }

        if (req.method == "GET") {
            const { userId } = req.query;
            let posts;

            if (userId && typeof userId === "string") {
                // 1. 查特定用户的post
                posts = await prisma.post.findMany({
                    where: { userId },
                    include: { user: true, comments: true },
                    orderBy: { createdAt: "desc" },
                });
            } else {
                // 2. 查看推荐的post
                posts = await prisma.post.findMany({
                    include: { user: true, comments: true },
                    orderBy: { createdAt: "desc" },
                });
            }

            return res.status(200).json(posts);
        }
    } catch (error) {
        console.log("post error", error);
        return res.status(400).end();
    }
}
