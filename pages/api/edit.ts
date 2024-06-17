import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
// import useCurrentUser from "../hooks/useCurrentUser";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "PATCH") {
        return res.status(405).end();
    }

    try {
        // 有session获取得到用户currentUser.id的方法失败，返回没有登录
        // const { data: currentUser } = useCurrentUser();
        // const { currentUser } = await serverAuth(req);
        // console.log("currentUser", currentUser);
        // 改成由body传入却可以。原因未知-20240617
        const { name, username, bio, profileImage, coverImage, id } = req.body;

        if (!name || !username) {
            throw new Error("Missing fields");
        }

        const updateUser = await prisma.user.update({
            // 修改成body传入
            // where: { id: currentUser.id },
            where: { id: id },
            data: {
                name,
                username,
                bio,
                coverImage,
                profileImage,
            },
        });

        return res.status(200).json({ updateUser });
    } catch (error) {
        console.log("error", error);
        return res.status(400).end();
    }
}
