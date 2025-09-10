'use client'

import { signIn } from "next-auth/react"
import { LaptopMinimalCheck } from "lucide-react"

export default function SignIn() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <LaptopMinimalCheck className="mx-auto h-24 w-24 text-blue-600" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Welcome to Todo App
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to manage your tasks
                    </p>
                </div>

                <div>
                    <button
                        onClick={() => signIn('google', { callbackUrl: '/' })}
                        className="cursor-pointer w-full flex justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                            <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                        </svg>
                        Sign in with Google

                    </button>
                </div>
            </div>
        </div>
    )
}