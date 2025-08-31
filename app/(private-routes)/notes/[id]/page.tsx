import {fetchServerNoteById} from '@/lib/api/serverApi';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetails from './NoteDetails.client';
import { Metadata } from 'next';
interface NotePageProps {
    params: Promise<{ id: string }>;
}
export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
    const { id } = await params;
    const note = await fetchServerNoteById(id);
    return {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 20),
        openGraph: {
            title: `Note: ${note.title}`,
            description: note.content.slice(0, 99),
            url: `https://08-zustand-woad-kappa.vercel.app/notes/${id}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: `Note: ${note.title}`,
                },
            ],
        },
    }
}
const NotePage = async ({ params }: NotePageProps) => {
    const queryClient = new QueryClient();
    const {id} = await params;
    
    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchServerNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetails/>
        </HydrationBoundary>
    );
};
export default NotePage;
