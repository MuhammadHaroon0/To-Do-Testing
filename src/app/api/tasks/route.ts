import { NextRequest, NextResponse } from "next/server"
import prisma from '@/lib/prisma'
import { protect } from "@/lib/auth-middleware"

export async function GET(req: NextRequest) {
    return protect(req, async (req, userId) => {
        const { searchParams } = new URL(req.url)
        const q = searchParams.get('q') || ''
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
        const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get('pageSize') || '10')))

        const skip = (page - 1) * pageSize

        const where = {
            userId,
            ...(q && {
                title: {
                    contains: q,
                    mode: 'insensitive' as const
                }
            })
        }

        const [tasks, total] = await Promise.all([
            prisma.task.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.task.count({ where })
        ])

        const totalPages = Math.ceil(total / pageSize)

        return NextResponse.json({
            items: tasks,
            page,
            pageSize,
            total,
            totalPages
        })
    })
}

export async function POST(req: NextRequest) {
    return protect(req, async (req, userId) => {
        try {
            const body = await req.json()
            const { title } = body

            if (!title || typeof title !== 'string' || title.trim().length === 0) {
                return NextResponse.json({ error: "Title is required" }, { status: 400 })
            }

            if (title.length > 200) {
                return NextResponse.json({ error: "Title must be 200 characters or less" }, { status: 400 })
            }

            const task = await prisma.task.create({
                data: {
                    title: title.trim(),
                    userId
                }
            })

            return NextResponse.json(task, { status: 201 })
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
        }
    })
}