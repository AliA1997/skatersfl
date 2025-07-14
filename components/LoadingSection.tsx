'use client';
import { Loader2 } from "lucide-react";


export default function LoadingSection() {
    // Default State
    return (
        <div className='flex flex-col min-h-[50vh] items-center justify-center'>
            <Loader2 className='animate-spin' size={100} />
        </div>
    );
}