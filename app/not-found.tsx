import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Notehub - Page Not Found`,
    description: `The page you are looking for does not exist.`,
    openGraph: {
        title: `Notehub - Page Not Found`,
        description: `The page you are looking for does not exist.`,
        url: `https://08-zustand-woad-kappa.vercel.app/`,
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: "Notehub 404",
            },
        ],
    }
}
const NotFound = () => {
    return (
    <>
    <h1>404 - Page not found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    </>
        )};  
export default NotFound;