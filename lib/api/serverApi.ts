import { cookies } from "next/headers"
import { NextServer } from "./api"
import { CheckSession } from "./clientApi"
import { User } from "@/types/user"
import { Note } from "@/types/note";
interface PaginatedResponse {
    notes: Note[]; 
    page: number;
    totalPages: number;
}
export const CheckServerSession = async () => {
    const cookiesData = await cookies()
    const res = await NextServer.get<CheckSession>('/auth/session',{headers: { cookie: cookiesData.toString() }})
    return res
}
export const getServerMe = async (): Promise<User> => {
     const cookiesData = await cookies()
    const res = await NextServer.get<User>('/users/me',{headers: { cookie: cookiesData.toString() }})
    return res.data;
}

export const fetchServerNotes = async (page: number, query: string, tag?: string): Promise<PaginatedResponse> => {
     const cookiesData = await cookies()
    const response = await NextServer.get<PaginatedResponse>('/notes', {
        params: {
            search: query.trim() !== "" ? query : undefined,
            page,
            perPage: 12,
            tag: tag && tag !== 'All' ? tag : undefined, 

        }, headers: { cookie: cookiesData.toString() }
        
    });
    return response.data;
}
export const fetchServerNoteById = async (noteId: string) => {
    const cookiesData = await cookies()
    const response = await NextServer.get<Note>(`/notes/${noteId}`, { headers: { cookie: cookiesData.toString() } });
    return response.data;
};