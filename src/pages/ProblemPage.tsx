import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Copy, Check, Clock, Database, Tag, ArrowLeft } from 'lucide-react';
import { PROBLEMS, CATEGORIES } from '../data/problems';
import { cn } from '../lib/utils';

export default function ProblemPage() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'c' | 'cpp' | 'python' | 'java' | 'javascript'>('c');
  const [copied, setCopied] = useState(false);

  const problemIndex = PROBLEMS.findIndex(p => p.id === problemId);
  const problem = PROBLEMS[problemIndex];
  
  // Reset tab when problem changes
  useEffect(() => {
    setActiveTab('c');
  }, [problemId]);

  if (!problem) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Problem Not Found</h2>
        <p className="text-neutral-400 mb-8">The problem you are looking for doesn't exist.</p>
        <Link to="/" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors font-medium">
          Back to Archive
        </Link>
      </div>
    );
  }

  const prevProblem = problemIndex > 0 ? PROBLEMS[problemIndex - 1] : null;
  const nextProblem = problemIndex < PROBLEMS.length - 1 ? PROBLEMS[problemIndex + 1] : null;
  const category = CATEGORIES.find(c => c.id === problem.categoryId);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(problem.solutions[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'c', label: 'C', lang: 'c' },
    { id: 'cpp', label: 'C++', lang: 'cpp' },
    { id: 'python', label: 'Python', lang: 'python' },
    { id: 'java', label: 'Java', lang: 'java' },
    { id: 'javascript', label: 'JavaScript', lang: 'javascript' },
  ] as const;

  return (
    <div className="w-full">
      {/* Header Area */}
      <div className="border-b border-white/5 bg-white/2 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to all problems
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider border",
                  problem.difficulty === 'Easy' ? 'border-green-500/20 text-green-300 bg-green-500/20' :
                  problem.difficulty === 'Medium' ? 'border-amber-500/20 text-amber-300 bg-amber-500/20' :
                  'border-indigo-500/20 text-indigo-300 bg-indigo-500/20'
                )}>
                  {problem.difficulty}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/5 text-slate-400 bg-white/5 leading-tight flex items-center gap-1.5 uppercase tracking-wider">
                  <Tag className="w-3 h-3" />
                  {category?.title}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                {problem.title}
              </h1>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => prevProblem && navigate(`/problems/${prevProblem.id}`)}
                disabled={!prevProblem}
                className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title={prevProblem?.title}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => nextProblem && navigate(`/problems/${nextProblem.id}`)}
                disabled={!nextProblem}
                className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title={nextProblem?.title}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col xl:flex-row gap-8">
        {/* Left Column: Problem Details */}
        <div className="flex-1 space-y-8">
          {/* Statement */}
          <section>
            <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">
              Problem Statement
            </h4>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm">
              {problem.statement.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Formats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white/2 p-4 rounded-xl border border-white/5">
              <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Input Format</h4>
              <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">{problem.inputFormat}</p>
            </section>
            <section className="bg-white/2 p-4 rounded-xl border border-white/5">
              <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Output Format</h4>
              <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">{problem.outputFormat}</p>
            </section>
          </div>

          {/* Constraints & Complexity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white/2 p-4 rounded-xl border border-white/5 flex flex-col">
              <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Constraints</h4>
              <div className="font-mono text-[11px] text-slate-300 bg-black/40 p-3 rounded-lg border border-white/5 whitespace-pre-wrap flex-1">
                {problem.constraints}
              </div>
            </section>

            <section className="bg-white/2 p-4 rounded-xl border border-white/5">
              <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Complexity</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Time</span>
                  <span className="font-mono text-indigo-400">{problem.timeComplexity}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Space</span>
                  <span className="font-mono text-indigo-400">{problem.spaceComplexity}</span>
                </div>
              </div>
            </section>
          </div>

          {/* Sample I/O */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Sample Input</h4>
              <div className="font-mono text-[11px] text-slate-300 bg-black/40 p-4 rounded-xl border border-white/5 whitespace-pre-wrap overflow-x-auto">
                {problem.sampleInput}
              </div>
            </section>
            <section>
              <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Sample Output</h4>
              <div className="font-mono text-[11px] text-slate-300 bg-black/40 p-4 rounded-xl border border-white/5 whitespace-pre-wrap overflow-x-auto">
                {problem.sampleOutput}
              </div>
            </section>
          </div>

          {/* Explanation */}
          <section className="border-t border-white/5 pt-8">
            <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Approach & Explanation</h4>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm">
              <p>{problem.explanation}</p>
            </div>
          </section>
        </div>

        {/* Right Column: Code Viewer */}
        <div className="xl:w-[600px] flex-shrink-0">
          <div className="sticky top-24 bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm flex flex-col">
            {/* Tabs */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/2">
              <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Solution</h4>
              <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "px-3 py-1 rounded text-[10px] font-bold transition-all",
                      activeTab === tab.id
                        ? "bg-white/10 text-white"
                        : "text-slate-500 hover:text-slate-300"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5 relative group">
              <span className="text-[11px] font-mono text-slate-500">
                solution.{activeTab === 'javascript' ? 'js' : activeTab === 'python' ? 'py' : activeTab}
              </span>
              <button
                onClick={copyToClipboard}
                className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Code Content */}
            <div className="h-[600px] overflow-y-auto w-full text-sm bg-black/60 custom-scrollbar relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <SyntaxHighlighter
                    language={tabs.find(t => t.id === activeTab)?.lang || 'javascript'}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      background: 'transparent',
                      fontSize: '13px',
                      lineHeight: '1.6',
                    }}
                    showLineNumbers={true}
                    lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#6e7681', textAlign: 'right' }}
                  >
                    {problem.solutions[activeTab]}
                  </SyntaxHighlighter>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
