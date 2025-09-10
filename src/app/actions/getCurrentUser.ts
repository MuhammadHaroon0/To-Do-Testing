import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { SafeUser } from "@/types";

export default async function getCurrentUser(): Promise<SafeUser | null> {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                name: true,
                email: true,

            },

        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
        };
    } catch (error) {
        console.error("Error in getCurrentUser:", error);
        return null;
    }
}