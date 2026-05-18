import { CreateFeedForm } from '@/components/CreateFeedForm';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6"
          >
            ← Back to Feed
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Admin Panel
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Publish new coaching insights to the live feed.
          </p>
        </header>

        <section>
          <CreateFeedForm />
        </section>
      </main>
    </div>
  );
}
