import { getBlogPosts } from "@/lib/supabase";

// Generate static params for all published blog posts
export async function generateStaticParams() {
    try {
        const posts = await getBlogPosts();
        return posts.map((post) => ({
            slug: post.slug,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
