
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col justify-between items-center bg-gradient-to-br from-white via-gray-50 to-gray-200 dark:from-[#18181b] dark:via-[#23232a] dark:to-[#18181b] p-2 sm:p-4 md:p-8">
      <main className="flex flex-1 flex-col w-full max-w-3xl items-center justify-center gap-8 py-6 sm:py-10">
        <div className="flex flex-col items-center gap-2 mb-2">
          <Image
            src="/univiewlab-logo.svg"
            alt="Univiewlab logo"
            width={72}
            height={72}
            className="rounded-full shadow-lg border-2 border-blue-500 bg-white dark:bg-[#23232a]"
            priority
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent px-2 tracking-tight">
            Univiewlab
          </h1>
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-gray-700 dark:text-gray-200 max-w-2xl mb-2">
          The Ultimate Responsive Preview & Web Audit Tool
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-center text-gray-700 dark:text-gray-300 max-w-xl px-2">
          Univiewlab helps you preview your website on 40+ real device models, search and select devices, and instantly check your site’s look and feel. Plus, run security and SEO audits to ensure your site is safe and optimized for search engines—all in one modern, easy-to-use interface.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full justify-center items-center mt-2">
          <a
            href="/preview"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-500 text-white gap-2 hover:from-blue-700 hover:to-purple-600 font-medium text-base h-12 px-6 w-full sm:w-auto shadow-lg"
          >
            Device Preview
          </a>
          <a
            href="/security"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-6 w-full sm:w-auto md:w-[158px] shadow"
          >
            Security Check
          </a>
          <a
            href="/seo"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-6 w-full sm:w-auto md:w-[158px] shadow"
          >
            SEO Audit
          </a>
        </div>
      </main>
      {/* Footer removed for clean, focused landing page */}
    </div>
  );
}
