function LoadingBox() {
  return (
    <div className="flex h-80 w-full items-center justify-center rounded bg-[#1b1818]" />
  );
}

function SongSkeleton() {
  return (
    <div className="grid w-full grid-cols-4">
      <div className="flex items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded bg-[#1b1818]" />
        <div className="flex flex-col gap-y-2 px-2 py-1">
          <div className="h-3 w-36 rounded-full bg-[#1b1818]"></div>
          <div className="h-2 w-24 rounded-full bg-[#1b1818]"></div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="h-3 w-48 rounded-full bg-[#1b1818]"></div>
      </div>
      <div className="flex items-center">
        <div className="h-3 w-40 rounded-full bg-[#1b1818]"></div>
      </div>
      <div className="flex items-center">
        <div className="h-3 w-12 rounded-full bg-[#1b1818]"></div>
      </div>
    </div>
  );
}

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex h-screen flex-col overflow-hidden p-5">
      <div role="status" className="flex animate-pulse flex-col items-center">
        <div className="flex w-full">
          <div className="mb-2 h-4 w-48 rounded-full bg-[#1b1818]"></div>
        </div>
        <div className="flex w-full justify-between gap-x-5">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <LoadingBox key={i} />
            ))}
        </div>
        <div className="mt-5 flex w-full flex-col items-center justify-center gap-y-2 p-4">
          <div className="mb-1 grid w-full grid-cols-4">
            <div className="h-2 w-24 rounded-full bg-[#1b1818]"></div>
            <div className="h-2 w-24 rounded-full bg-[#1b1818]"></div>
            <div className="h-2 w-16 rounded-full bg-[#1b1818]"></div>
            <div className="h-2 w-8 rounded-full bg-[#1b1818]"></div>
          </div>
          {Array(15)
            .fill(0)
            .map((_, i) => (
              <SongSkeleton key={i} />
            ))}
        </div>
        {/* <div className="w-full">
          <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div> */}
      </div>
    </div>
  );
}
