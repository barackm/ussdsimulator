import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "USSD Simulator",
  description:
    "Welcome to the USSD Simulator! Start exploring by navigating to the src/app/ussd/page.tsx and testing your USSD flows.",
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="absolute top-5 flex gap-6">
        <Link
          href="https://github.com/barackm/ussdsimulator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl"
        >
          <FaGithub />
        </Link>
        <Link
          href="https://www.linkedin.com/in/baraka-mukelenga/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl"
        >
          <FaLinkedin />
        </Link>
        <Link
          href="https://x.com/BarackMukelenga"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl"
        >
          <FaTwitter />
        </Link>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-4xl font-bold">Welcome to USSD Simulator</h1>
        <p className="text-center sm:text-left w-full max-w-[500px]">
          Welcome to the USSD Simulator! Start exploring by navigating to the
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            src/app/ussd/page.tsx
          </code>
          and testing your USSD flows.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/ussd">
            <Button>Try USSD Simulator</Button>
          </Link>
          <Link
            href="https://github.com/barackm/ussdsimulator/blob/main/README.md"
            target="_blank"
          >
            <Button variant="outline" className="text-black">
              Read our docs
            </Button>
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/barackm/ussdsimulator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          Star on GitHub
        </a>
      </footer>
    </div>
  );
}
