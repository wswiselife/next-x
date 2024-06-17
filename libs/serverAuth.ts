import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prisma from "@/libs/prismadb";

// 判断用户是否登录，获取session,相当于axios中的token的作用，
const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({ req });

    console.log("session.user", session);
    if (!session?.user?.email) {
        throw new Error("Not signed in ");
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!currentUser) {
        throw new Error("Not signed in");
    }

    return { currentUser };
};

export default serverAuth;
