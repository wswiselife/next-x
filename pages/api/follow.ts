import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST" && req.method !== "DELETE") {
        return res.status(405).end();
    }

    try {
        const { userId, currentUser } = req.body;

        if (!userId || typeof userId !== "string") {
            throw new Error("Invalid ID");
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new Error("Invalid ID");
        }

        // 这里的作用？得到当前用户的粉丝，将自己加进数组中
        let updateFollowingIds = [...(user.followingIds || [])];

        if (req.method == "POST") {
            updateFollowingIds.push(userId);
        }

        // 过滤出新的数组
        if (req.method == "DELETE") {
            updateFollowingIds = updateFollowingIds.filter(
                followingId => followingId !== userId
            );
        }

        // 将整个数组更新上去
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                followingIds: updateFollowingIds,
            },
        });

        return res.status(200).json({ updatedUser });
    } catch (error) {
        return res.status(400).end();
    }
}
