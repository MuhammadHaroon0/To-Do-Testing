import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function protect(
    req: NextRequest,
    handler: (req: NextRequest, userId: string) => Promise<NextResponse>
) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return handler(req, session.user.id)
}