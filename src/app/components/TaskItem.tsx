'use client'

import { Task } from '@prisma/client'
import { Check } from 'lucide-react'

interface TaskItemProps {
    task: Task
    onToggle: (id: string) => void
    isToggling?: boolean
}

export function TaskItem({ task, onToggle, isToggling }: TaskItemProps) {
    return (
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
            <button
                onClick={() => onToggle(task.id)}
                disabled={isToggling}
                className={`cursor-pointer flex items-center justify-center w-5 h-5 rounded border-2 transition-colors ${task.done
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-green-500'
                    } ${isToggling ? 'opacity-50' : ''}`}
            >
                {task.done && <Check size={12} />}
            </button>

            <span
                className={`flex-1 ${task.done ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}
            >
                {task.title}
            </span>

            <span className="text-xs text-gray-400">
                {new Date(task.createdAt).toLocaleDateString()}
            </span>
        </div>
    )
}