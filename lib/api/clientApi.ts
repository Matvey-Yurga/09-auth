"use client";
import { User } from "@/types/user";
import type { Note, NoteData } from "../../types/note";
import { NextServer } from "./api";

interface PaginatedResponse {
    notes: Note[]; 
    page: number;
    totalPages: number;
}
export type RegisterPayload = {
    email: string;
    password: string;
}
export type CheckSession = {
success: boolean;
}
interface Update {
  username: string;
}
export const Register = async (payload: RegisterPayload) => {
    const res = await NextServer.post<User>('/auth/register',payload);
    return res.data;
}
export const Login = async (payload: RegisterPayload) => {
    const res = await NextServer.post<User>('/auth/login',payload);
    return res.data;
}
export const CheckSession = async () =>{
    const res = await NextServer.get<CheckSession>('/auth/session')
    return res.data.success
}
export const Logout = async (): Promise<void> =>{
    await NextServer.post('/auth/logout')
}
export const getMe = async (): Promise<User> =>{
    const res = await NextServer.get<User>('/users/me')
    return res.data;
}
export const patchMe = async (data:Update): Promise<User> =>{
    const res = await NextServer.patch<User>('/users/me', data)
    return res.data;
}


export const fetchNotes = async (page: number, query: string, tag?: string): Promise<PaginatedResponse> => {
     
    const response = await NextServer.get<PaginatedResponse>('/notes', {
        params: {
            search: query.trim() !== "" ? query : undefined,
            page,
            perPage: 12,
            tag: tag && tag !== 'All' ? tag : undefined, 

        }
        
    });
    return response.data;
}
export const fetchNoteById = async (noteId: string) => {
    const response = await NextServer.get<Note>(`/notes/${noteId}`, {
    });
    return response.data;
};
export const createNote = async (noteData: NoteData): Promise<Note> => {
    const response = await NextServer.post<Note>('/notes', noteData, {
    });
    return response.data;
}


export const deleteNote = async (noteId: string | number): Promise<Note> => { 
    const response = await NextServer.delete<Note>(`/notes/${noteId}`, {
    });
    return response.data;
}