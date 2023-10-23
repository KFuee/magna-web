import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center h-screen">
      <div className="inline-block animate-pulse dark:invert">
        <Image src="/assets/logo.svg" alt="logo" width={256} height={256} />
      </div>
    </div>
  );
}
