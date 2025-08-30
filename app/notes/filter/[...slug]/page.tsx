import {fetchNotes} from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{slug: string[]}>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Note: ${slug[0]}`,
    description: `Notes tagged with ${slug[0]}`,
    openGraph: {
      title: `Note: ${slug[0]}`,
      description: `Notes tagged with ${slug[0]}`,
      url: `https://08-zustand-woad-kappa.vercel.app/notes/filter/${slug[0]}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes tagged with ${slug[0]}`,
        },
      ],
    },
  }
}
export default async function NotesPage({params}: Props) {
  const { slug } = await params;

  const tag = slug ? slug[0] : undefined;
    const query = "";
    const page = 1;
      const initialData = await fetchNotes(page, query, tag);
    return (<NotesClient initialData={initialData} tag={tag} /> );
}

