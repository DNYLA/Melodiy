import Trending from '@/app/(site)/components/trending';

export default async function Home() {
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto rounded-lg mt-3">
      <Trending />
    </div>
  );
}
