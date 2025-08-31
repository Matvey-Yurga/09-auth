"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface props {
    children: React.ReactNode
}

export default function AuthLayot({children}: props){
    const router = useRouter();
    useEffect(() => {
        router.refresh()
    },[router])
    return (<>
        {children}
    </>)
}