'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

import css from './NotesPage.module.css';
import Link from 'next/link';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesClientProps {
  initialData: FetchNotesResponse;
  tag?: string;
}

const NotesClient = ({ initialData, tag }: NotesClientProps) => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedQuery] = useDebounce(query, 300);

  const { data } = useQuery({
    queryKey: ['notes', debouncedQuery, currentPage, tag],
    queryFn: () => fetchNotes(currentPage, debouncedQuery , tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearch = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }
  useEffect(() => {
  setCurrentPage(1);
  }, [tag]);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
                {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={currentPage}
            onPageChange={setCurrentPage}
        />
      )}
        <Link href="/notes/action/create" >
          <button className={css.button} >
          Create note +
        </button></Link> 
      </header>
      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p className={css.noNotes}>No notes found</p>)}
    </div>
  );
};

export default NotesClient;
