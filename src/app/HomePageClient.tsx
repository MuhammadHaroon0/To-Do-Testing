'use client'
import { useState, useEffect, useCallback } from 'react'
import { LaptopMinimalCheck } from 'lucide-react'
import { Task } from "@prisma/client"
import { TaskForm } from "./components/TaskForm"
import { SearchAndPagination } from "./components/SearchAndPagination"
import { TaskItem } from "./components/TaskItem"
import { Header } from "./components/Header"
import { SafeUser } from "@/types"
import useDebounce from "./hooks/useDebounce"
import { Loader } from "./components/Loader"
import axios from 'axios'

export default function HomePageClient({ currentUser }: { currentUser: SafeUser }) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [togglingTasks, setTogglingTasks] = useState<Set<string>>(new Set())
    const debouncedSearchQuery = useDebounce(searchQuery, 300)
    const pageSize = 5

    const fetchTasks = useCallback(async () => {
        try {
            const params = {
                page: currentPage.toString(),
                pageSize: pageSize.toString(),
                ...(debouncedSearchQuery && { q: debouncedSearchQuery })
            }
            const response = await axios.get('/api/tasks', {
                params
            })
            setTasks(response.data.items)
            setTotalPages(response.data.totalPages)
            setTotal(response.data.total)
        } catch (error) {
            console.error('Error fetching tasks:', error)
        } finally {
            setLoading(false)
        }
    }, [currentPage, debouncedSearchQuery, currentUser])

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearchQuery])

    const handleCreateTask = async (title: string) => {
        setIsSubmitting(true)
        try {
            await axios.post('/api/tasks', { title })
            await fetchTasks()
        } catch (error) {
            throw error
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleToggleTask = async (taskId: string) => {
        setTogglingTasks(prev => new Set(prev).add(taskId))
        try {
            const response = await axios.patch(`/api/tasks/${taskId}/toggle`)
            const updatedTask = response.data
            setTasks(prev =>
                prev.map(task =>
                    task.id === taskId ? updatedTask : task
                )
            )
        } catch (error) {
            console.error('Error toggling task:', error)
        } finally {
            setTogglingTasks(prev => {
                const newSet = new Set(prev)
                newSet.delete(taskId)
                return newSet
            })
        }
    }

    if (loading)
        return <Loader />

    return (
        <div className="min-h-screen bg-gray-50">
            <Header currentUser={currentUser} />
            <main className="max-w-4xl mx-auto px-4 py-8">
                <TaskForm onSubmit={handleCreateTask} isSubmitting={isSubmitting} />
                <SearchAndPagination
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    pageSize={pageSize}
                    total={total}
                />
                <div className="space-y-2">
                    {tasks.length === 0 ? (
                        <div className="text-center py-12">
                            <LaptopMinimalCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">
                                {debouncedSearchQuery ? 'No tasks found matching your search.' : 'No tasks yet. Create your first task!'}
                            </p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={handleToggleTask}
                                isToggling={togglingTasks.has(task.id)}
                            />
                        ))
                    )}
                </div>
            </main>
        </div>
    )
}