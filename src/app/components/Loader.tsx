import { Loader2 } from 'lucide-react'
import React from 'react'

export const Loader = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
    )

}
