import { signOut } from "next-auth/react"
import { LogOut, LaptopMinimalCheck } from 'lucide-react'
import { SafeUser } from "@/types"

interface HeaderProps {
    currentUser: SafeUser
}

export function Header({ currentUser }: HeaderProps) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <LaptopMinimalCheck className="h-8 w-8 text-blue-600" />
                    <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                        Hi, {currentUser.name || currentUser.email}
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="cursor-pointer flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        <LogOut size={16} />
                        <span>Sign out</span>
                    </button>
                </div>
            </div>
        </header>
    )
}