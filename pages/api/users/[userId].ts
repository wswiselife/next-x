import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).end();
    }

    try {
        const { userId } = req.query;

        if (!userId || typeof userId !== "string") {
            throw new Error("Invalid ID");
        }

        // 检查用户是否存在
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId,
                },
            },
        });

        return res.status(200).json({ ...existingUser, followersCount });
    } catch (error) {
        res.status(400).end();
    }
}
