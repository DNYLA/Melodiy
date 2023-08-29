import Trending from '@/app/(site)/components/trending';

export default async function Home() {
  return (
    <div className="mt-3 h-full w-full overflow-hidden overflow-y-auto rounded-lg">
      <Trending />
    </div>
  );
}
