import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { protect } from "@/lib/auth-middleware"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return protect(req, async (req, userId) => {
        const { id: taskId } = await params

        const existingTask = await prisma.task.findFirst({
            where: {
                id: taskId,
                userId
            }
        })

        if (!existingTask) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 })
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                done: !existingTask.done
            }
        })

        return NextResponse.json(updatedTask)
    })
}