'use client'

import { useState } from 'react'
import { SquarePlus } from 'lucide-react'

interface TaskFormProps {
    onSubmit: (title: string) => Promise<void>
    isSubmitting?: boolean
}

export function TaskForm({ onSubmit, isSubmitting }: TaskFormProps) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim()) {
            setError('Title is required')
            return
        }

        if (title.length > 200) {
            setError('Title must be 200 characters or less')
            return
        }

        try {
            await onSubmit(title.trim())
            setTitle('')
            setError('')
        } catch (err) {
            setError('Failed to create task')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col space-y-2">
                <div className="flex-1">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                            if (error) setError('')
                        }}
                        placeholder="Add a new task..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={200}
                        disabled={isSubmitting}
                    />
                    {error && (
                        <p className="mt-1 text-sm text-red-600">{error}</p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting || !title.trim()}
                    className="cursor-pointer w-24 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                    <SquarePlus size={20} />
                    <span>{isSubmitting ? 'Adding...' : 'Add'}</span>
                </button>
            </div>
        </form>
    )
}