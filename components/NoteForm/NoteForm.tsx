"use client"
import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { NoteData, NoteTag } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";
export default function NoteForm() { 
    const {draft,setDraft,clearDraft } = useNoteDraftStore()
const router = useRouter();
const TagsNote: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
const queryClient = useQueryClient()

  const handleClose = () => {
  router.back();

};
  const noteMutation = useMutation({
    mutationFn: (noteData: NoteData) => createNote(noteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/All');
    },
    onError: () => {
      alert('Failed to create note. Please try again.');
    }
})
  const handleSubmit = (formData: FormData) => {
    const tag = formData.get('tag') as string
    if (!TagsNote.includes(tag as NoteTag)) {
      alert('Invalid tag selected. Please choose a valid tag.');
      return;
    }
    noteMutation.mutate({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: tag as NoteTag, 
    })
  }
   const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
    return (
        <form className={css.form} action={handleSubmit}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <input id="title" type="text" name="title" className={css.input} value={draft.title} onChange={handleChange} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <textarea
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
      value={draft.content} onChange={handleChange}
    />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select id="tag" name="tag" className={css.select} value={draft.tag} onChange={handleChange}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={handleClose}>
      Cancel
    </button>
    <button
    type="submit"
            className={css.submitButton}
    >
      Create note
    </button>
  </div>
            </form>
    )
}

