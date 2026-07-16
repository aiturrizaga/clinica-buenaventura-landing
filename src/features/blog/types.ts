export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: BlogAuthor;
    category: string;
    tags: string[];
    publishedAt: string;
    readingTime: number;
    featured: boolean;
}

export interface BlogAuthor {
    name: string;
    role: string;
    avatar: string;
}
