import css from "./LayoutNotes.module.css";
interface Props {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}
export default function Layout({ children, sidebar  }: Props) {
    return (
        <div className={css.container}>
        <div className={css.notesWrapper}>{children}</div>
            <div className={css.sidebar}>{sidebar}</div>
        </div>)
    
}