export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8">About BTCOL606</h1>
      <div className="prose prose-invert prose-indigo max-w-none">
        <p className="text-lg text-neutral-300 mb-6">
          BTCOL606 is the course code for <strong>Competitive Programming</strong>. 
          This archive serves as a digital lab manual, encompassing the fixed practical 
          problems assigned for the curriculum.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Project Goals</h2>
        <p className="text-neutral-400 mb-4">
          This project aims to provide a clean, accessible, and modern interface for viewing 
          common data structures and algorithms problems. It showcases solutions across 
          multiple paradigms and programming languages.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-400 mb-8">
          <li>Provide a centralized, easy-to-search repository of problems.</li>
          <li>Demonstrate implementations across C, C++, Python, Java, and JavaScript.</li>
          <li>Encourage deeper understanding through complexity analysis and methodical explanations.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Tech Stack & Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-neutral-400">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <strong className="text-indigo-400 block mb-2">Frontend</strong>
            React 19, React Router V6, Tailwind CSS, Framer Motion
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <strong className="text-indigo-400 block mb-2">Design</strong>
            Glassmorphism, Dark Mode, Typography-driven layout
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <strong className="text-indigo-400 block mb-2">Functionality</strong>
            Static Architecture, Syntax Highlighting, Real-time search
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <strong className="text-indigo-400 block mb-2">Deployment</strong>
            Ready for fast static hosting (Vercel, Netlify, GitHub Pages)
          </div>
        </div>
      </div>
    </div>
  );
}
