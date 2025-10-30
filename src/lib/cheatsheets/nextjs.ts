import { CheatSheet } from "@/types/cheatsheet";

export const nextjsCheatSheet: CheatSheet = {
  title: "Next.js Cheat Sheet",
  description:
    "Modern Next.js 14+ with App Router, Server Components, and performance optimizations",
  sections: [
    {
      id: "app-router",
      title: "App Router",
      description: "Next.js App Router structure, routing, and layout patterns",
      examples: [
        {
          title: "File-based Routing Structure",
          description: "App Router directory structure and file conventions",
          language: "bash",
          difficulty: "beginner",
          tags: ["routing", "app-router", "basics", "structure"],
          code: `app/
├── layout.tsx          # Root layout (required)
├── page.tsx           # Home page (/)
├── loading.tsx        # Loading UI
├── error.tsx          # Error UI
├── not-found.tsx      # 404 page
├── global-error.tsx   # Global error boundary
├── blog/
│   ├── layout.tsx     # Blog layout
│   ├── page.tsx       # Blog home (/blog)
│   ├── loading.tsx    # Blog loading UI
│   └── [slug]/
│       ├── page.tsx   # Blog post (/blog/[slug])
│       └── loading.tsx
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx       # /dashboard
│   ├── settings/
│   │   └── page.tsx   # /dashboard/settings
│   └── users/
│       ├── page.tsx   # /dashboard/users
│       └── [id]/
│           └── page.tsx # /dashboard/users/[id]
└── api/
    ├── users/
    │   └── route.ts   # API: /api/users
    └── auth/
        └── route.ts   # API: /api/auth`,
        },
        {
          title: "Root Layout",
          description: "Creating the root layout with metadata and providers",
          language: "tsx",
          difficulty: "intermediate",
          tags: ["layout", "metadata", "server-components"],
          code: `// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'My App',
    template: '%s | My App',
  },
  description: 'A modern Next.js application',
  keywords: ['Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
            {/* Navigation */}
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          {/* Footer */}
        </footer>
      </body>
    </html>
  );
}`,
        },
        {
          title: "Dynamic Routes and Params",
          description:
            "Creating dynamic routes with parameters and catch-all segments",
          language: "tsx",
          code: `// app/blog/[slug]/page.tsx
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPost({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = await searchParams;

  // Fetch post data
  const post = await getPost(slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then((res) =>
    res.json()
  );

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

// Catch-all routes: [...slug] or [[...slug]]
// app/docs/[[...slug]]/page.tsx
interface DocsPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug = [] } = await params;
  const path = slug.join('/');

  return <div>Docs path: {path}</div>;
}`,
        },
        {
          title: "Parallel and Intercepted Routes",
          description:
            "Advanced routing patterns with parallel and intercepted routes",
          language: "tsx",
          code: `// Parallel Routes Structure
app/
├── layout.tsx
├── page.tsx
├── @analytics/
│   ├── page.tsx       # Default analytics
│   └── loading.tsx
├── @team/
│   ├── page.tsx       # Default team
│   └── error.tsx
└── dashboard/
    ├── page.tsx
    ├── @analytics/
    │   └── page.tsx   # Analytics for dashboard
    └── @team/
        └── page.tsx   # Team for dashboard

// app/layout.tsx - Using parallel routes
export default function Layout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div className="grid grid-cols-2 gap-4">
        <div>{analytics}</div>
        <div>{team}</div>
      </div>
    </div>
  );
}

// Intercepted Routes Structure
app/
├── layout.tsx
├── page.tsx
├── photo/
│   └── [id]/
│       └── page.tsx   # Photo detail page
└── @modal/
    ├── default.tsx    # Default slot content
    └── (..)photo/     # Intercept /photo/[id]
        └── [id]/
            └── page.tsx # Modal version

// app/@modal/(..)photo/[id]/page.tsx
import { Modal } from '@/components/modal';

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = await getPhoto(id);

  return (
    <Modal>
      <img src={photo.url} alt={photo.title} />
    </Modal>
  );
}`,
        },
      ],
    },
    {
      id: "data-fetching",
      title: "Data Fetching",
      description: "Server Components, data fetching strategies, and caching",
      examples: [
        {
          title: "Server Component Data Fetching",
          description:
            "Fetching data in Server Components with different caching strategies",
          language: "tsx",
          code: `// Basic data fetching in Server Component
export default async function BlogPage() {
  // Static data (cached by default)
  const posts = await fetch('https://api.example.com/posts', {
    cache: 'force-cache' // Default behavior
  }).then(res => res.json());

  // Dynamic data (not cached)
  const recentPosts = await fetch('https://api.example.com/posts/recent', {
    cache: 'no-store'
  }).then(res => res.json());

  // Revalidated data (cached with time-based revalidation)
  const featuredPosts = await fetch('https://api.example.com/posts/featured', {
    next: { revalidate: 3600 } // Revalidate every hour
  }).then(res => res.json());

  // Tagged data (for on-demand revalidation)
  const categories = await fetch('https://api.example.com/categories', {
    next: { tags: ['categories'] }
  }).then(res => res.json());

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// Parallel data fetching
export default async function Dashboard() {
  // These requests will run in parallel
  const [users, posts, analytics] = await Promise.all([
    fetch('https://api.example.com/users').then(res => res.json()),
    fetch('https://api.example.com/posts').then(res => res.json()),
    fetch('https://api.example.com/analytics').then(res => res.json()),
  ]);

  return (
    <div>
      <UserStats users={users} />
      <PostsList posts={posts} />
      <AnalyticsDashboard data={analytics} />
    </div>
  );
}`,
        },
        {
          title: "Database and ORM Integration",
          description: "Direct database queries in Server Components",
          language: "tsx",
          code: `// Database queries in Server Components
import { db } from '@/lib/db';
import { posts, users } from '@/lib/schema';
import { eq, desc, count } from 'drizzle-orm';

export default async function PostsPage() {
  // Direct database query
  const recentPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      excerpt: posts.excerpt,
      createdAt: posts.createdAt,
      author: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .orderBy(desc(posts.createdAt))
    .limit(10);

  // Aggregate queries
  const postCount = await db
    .select({ count: count() })
    .from(posts);

  return (
    <div>
      <h1>Recent Posts ({postCount[0].count} total)</h1>
      {recentPosts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <small>By {post.author} on {post.createdAt.toLocaleDateString()}</small>
        </article>
      ))}
    </div>
  );
}

// Using Prisma
import { prisma } from '@/lib/prisma';

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: {
      posts: {
        select: {
          id: true,
          title: true,
        },
      },
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user._count.posts} posts</p>
        </div>
      ))}
    </div>
  );
}`,
        },
        {
          title: "Client-Side Data Fetching",
          description:
            "Data fetching in Client Components with SWR and React Query",
          language: "tsx",
          code: `'use client';

import useSWR from 'swr';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// SWR data fetching
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function UserProfile({ userId }: { userId: string }) {
  const { data: user, error, isLoading } = useSWR(
    \`/api/users/\${userId}\`,
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: false,
    }
  );

  if (error) return <div>Failed to load user</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// React Query data fetching
export function PostsList() {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then((res) => res.json()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const createPostMutation = useMutation({
    mutationFn: (newPost: { title: string; content: string }) =>
      fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      }).then((res) => res.json()),
    onSuccess: () => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleCreatePost = (postData: { title: string; content: string }) => {
    createPostMutation.mutate(postData);
  };

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      {posts?.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
      <button
        onClick={() => handleCreatePost({ title: 'New Post', content: 'Content' })}
        disabled={createPostMutation.isPending}
      >
        {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
      </button>
    </div>
  );
}

// Streaming with Suspense
import { Suspense } from 'react';

export default function PostsPage() {
  return (
    <div>
      <h1>Posts</h1>
      <Suspense fallback={<PostsSkeleton />}>
        <PostsList />
      </Suspense>
      <Suspense fallback={<CommentsSkeleton />}>
        <CommentsList />
      </Suspense>
    </div>
  );
}`,
        },
      ],
    },
    {
      id: "api-routes",
      title: "API Routes",
      description: "Creating API endpoints with Route Handlers and middleware",
      examples: [
        {
          title: "Basic Route Handlers",
          description: "Creating GET, POST, PUT, DELETE API endpoints",
          language: "typescript",
          code: `// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const allUsers = await db
      .select()
      .from(users)
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      users: allUsers,
      pagination: {
        page,
        limit,
        hasMore: allUsers.length === limit,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const [newUser] = await db
      .insert(users)
      .values({ name, email })
      .returning();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}`,
        },
        {
          title: "Dynamic Route Parameters",
          description: "Handling dynamic parameters in API routes",
          language: "typescript",
          code: `// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/users/[id]
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(id)))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id]
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email } = body;

    const [updatedUser] = await db
      .update(users)
      .set({ name, email, updatedAt: new Date() })
      .where(eq(users.id, parseInt(id)))
      .returning();

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id]
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, parseInt(id)))
      .returning();

    if (!deletedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}`,
        },
      ],
    },
    {
      id: "styling",
      title: "Styling & Components",
      description: "CSS, Tailwind, and component patterns in Next.js",
      examples: [
        {
          title: "Global Styles and CSS Modules",
          description: "Setting up global styles and component-scoped CSS",
          language: "css",
          code: `/* app/globals.css - Global styles */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }

  .card {
    @apply bg-white shadow-md rounded-lg p-6 border border-gray-200;
  }
}

/* components/Button.module.css - CSS Modules */
.button {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary {
  background-color: #3b82f6;
  color: white;
}

.primary:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.secondary {
  background-color: #6b7280;
  color: white;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
        },
        {
          title: "Server and Client Components",
          description: "Creating reusable Server and Client Components",
          language: "tsx",
          code: `// components/ServerComponent.tsx - Server Component
import { db } from '@/lib/db';

interface UserCardProps {
  userId: string;
}

// This is a Server Component by default
export default async function UserCard({ userId }: UserCardProps) {
  // Direct database access in Server Component
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <InteractiveButton userId={user.id} />
    </div>
  );
}

// components/ClientComponent.tsx - Client Component
'use client';

import { useState } from 'react';
import styles from './Button.module.css';

interface InteractiveButtonProps {
  userId: string;
}

export function InteractiveButton({ userId }: InteractiveButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(\`/api/users/\${userId}/like\`, {
        method: 'POST',
      });

      if (response.ok) {
        setLiked(!liked);
      }
    } catch (error) {
      console.error('Failed to like user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={\`\${styles.button} \${liked ? styles.primary : styles.secondary}\`}
      onClick={handleLike}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : liked ? 'Liked!' : 'Like'}
    </button>
  );
}

// components/CompoundComponent.tsx - Mixed pattern
import { Suspense } from 'react';

export default function UserProfile({ userId }: { userId: string }) {
  return (
    <div className="user-profile">
      {/* Server Component for static data */}
      <Suspense fallback={<UserCardSkeleton />}>
        <UserCard userId={userId} />
      </Suspense>

      {/* Client Component for interactive features */}
      <UserActions userId={userId} />

      {/* Server Component for related data */}
      <Suspense fallback={<PostsSkeleton />}>
        <UserPosts userId={userId} />
      </Suspense>
    </div>
  );
}`,
        },
      ],
    },
    {
      id: "performance",
      title: "Performance & Optimization",
      description: "Caching, optimization, and performance best practices",
      examples: [
        {
          title: "Image Optimization",
          description: "Using Next.js Image component for optimal performance",
          language: "tsx",
          code: `import Image from 'next/image';

// Basic image optimization
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={200}
        className="rounded-lg"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSd3gqOVSLKGOLKCKLdqDrHO3KGu++5VjSdbdRlKjWWtcjcbBHO/CQcfO+rKvqGq1yp9++2j1ksJZrC5/9k="
        priority // Load above-the-fold images first
      />
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
    </div>
  );
}

// Responsive images with multiple sizes
export function HeroImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero image"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority
    />
  );
}

// Dynamic images from CMS or API
export function UserAvatar({ user }: { user: User }) {
  return (
    <Image
      src={user.avatarUrl || '/default-avatar.png'}
      alt={\`\${user.name}'s avatar\`}
      width={40}
      height={40}
      className="rounded-full"
      loading="lazy"
    />
  );
}

// Image gallery with optimization
export function ImageGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((src, index) => (
        <div key={src} className="relative aspect-square">
          <Image
            src={src}
            alt={\`Gallery image \${index + 1}\`}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            loading={index < 6 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  );
}`,
        },
        {
          title: "Caching and Revalidation",
          description:
            "Data caching, ISR, and on-demand revalidation strategies",
          language: "typescript",
          code: `// Static data caching (default behavior)
export default async function StaticPage() {
  // This will be cached indefinitely
  const data = await fetch('https://api.example.com/static-data');
  return <div>{/* render data */}</div>;
}

// Time-based revalidation (ISR)
export const revalidate = 3600; // Revalidate every hour

export default async function ISRPage() {
  const data = await fetch('https://api.example.com/posts');
  const posts = await data.json();

  return (
    <div>
      {posts.map((post: any) => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  );
}

// On-demand revalidation
// app/api/revalidate/route.ts
import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const tag = searchParams.get('tag');
  const path = searchParams.get('path');

  // Verify secret token
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    if (tag) {
      // Revalidate specific tagged data
      revalidateTag(tag);
    } else if (path) {
      // Revalidate specific path
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}

// Tagged caching for granular control
export default async function ProductsPage() {
  const products = await fetch('https://api.example.com/products', {
    next: { tags: ['products'] }
  }).then(res => res.json());

  const featured = await fetch('https://api.example.com/products/featured', {
    next: { tags: ['products', 'featured'] }
  }).then(res => res.json());

  return (
    <div>
      <FeaturedProducts products={featured} />
      <AllProducts products={products} />
    </div>
  );
}

// Webhook to trigger revalidation
// Usage: POST /api/revalidate?secret=token&tag=products`,
        },
        {
          title: "Bundle Optimization",
          description: "Code splitting, dynamic imports, and bundle analysis",
          language: "typescript",
          code: `// Dynamic imports for code splitting
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load heavy components
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  ssr: false, // Disable SSR for client-only components
  loading: () => <div>Loading chart...</div>,
});

const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  ssr: false,
});

// Conditional loading
export default function Dashboard({ user }: { user: User }) {
  return (
    <div>
      <h1>Dashboard</h1>

      <Suspense fallback={<div>Loading chart...</div>}>
        <HeavyChart data={chartData} />
      </Suspense>

      {user.role === 'admin' && (
        <Suspense fallback={<div>Loading admin panel...</div>}>
          <AdminPanel />
        </Suspense>
      )}
    </div>
  );
}

// Route-based code splitting
const LazyRoute = dynamic(() => import('@/app/heavy-page/page'), {
  loading: () => <div>Loading page...</div>,
});

// Third-party library optimization
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

// Bundle analyzer setup
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  experimental: {
    optimizePackageImports: [
      'lodash',
      'date-fns',
      'react-icons',
    ],
  },

  // Tree shaking optimization
  webpack: (config) => {
    config.optimization.usedExports = true;
    return config;
  },
});

// Package.json scripts for analysis
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "build:analyze": "npm run build && npx @next/bundle-analyzer",
  }
}`,
        },
      ],
    },
  ],
};
