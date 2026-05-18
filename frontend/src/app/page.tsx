import { AppShell } from '@/components/layout/AppShell';
import { FeedList } from '@/components/FeedList';

export default function Home() {
  return (
    <AppShell>
      <FeedList />
    </AppShell>
  );
}
