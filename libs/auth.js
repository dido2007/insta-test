"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "./next-auth"

// First function to get user

export const auth = async () => {
    const session = await getServerSession(authOptions)
    return session
}

// is user admin 
export const isAdmin = async () => {
    const session = await getServerSession(authOptions)
    return session?.user?.role === "admin"
}

