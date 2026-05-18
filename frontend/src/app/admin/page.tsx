import { AppShell } from '@/components/layout/AppShell';
import { CreateFeedForm } from '@/components/CreateFeedForm';

export default function AdminPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-3 mb-8">
        <p className="text-zinc-500 text-sm leading-relaxed">
          Write and publish a new coaching update. It will instantly appear on the live feed for all connected users.
        </p>
      </div>
      <CreateFeedForm />
    </AppShell>
  );
}
