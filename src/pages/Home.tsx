import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, ChevronRight, Cpu, Type, Database, FastForward, Calculator, Infinity as InfinityIcon } from 'lucide-react';
import { CATEGORIES, PROBLEMS, Category, Problem } from '../data/problems';
import { cn } from '../lib/utils';

const iconMap: Record<string, any> = {
  Cpu, Type, Database, FastForward, Calculator, Infinity: InfinityIcon
};

function ProblemCard({ problem }: { problem: Problem }) {
  const category = CATEGORIES.find(c => c.id === problem.categoryId);
  const Icon = category?.icon ? iconMap[category.icon] : Cpu;

  return (
    <Link 
      to={`/problems/${problem.id}`}
      className="group relative flex flex-col justify-between p-6 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 cursor-pointer transition-all backdrop-blur-sm overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
        <ChevronRight className="w-5 h-5 text-indigo-400" />
      </div>
      
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
            problem.difficulty === 'Easy' ? 'text-green-400 bg-green-500/20' :
            problem.difficulty === 'Medium' ? 'text-amber-400 bg-amber-500/20' :
            'text-indigo-400 bg-indigo-500/20'
          )}>
            {problem.difficulty}
          </span>
          <span className="text-[10px] text-slate-500">ID: {problem.id}</span>
        </div>
        
        <h3 className="text-sm font-semibold text-white mb-2 pr-8">{problem.title}</h3>
        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
          {problem.statement}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Icon className="w-3.5 h-3.5 text-slate-500" />
           <span className="text-[10px] text-slate-500 tracking-wider uppercase">{category?.title}</span>
        </div>
        <div className="flex gap-1.5 items-center">
          {['C', 'C++', 'Python', 'Java', 'JS'].map((lang, i) => {
            const colors = ['bg-blue-400/80', 'bg-purple-400/80', 'bg-yellow-400/80', 'bg-red-400/80', 'bg-amber-600/80'];
            return (
              <div key={lang} className={cn("w-1.5 h-1.5 rounded-full", colors[i])} title={lang}></div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProblems = useMemo(() => {
    return PROBLEMS.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.statement.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory ? p.categoryId === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="w-full">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row gap-12">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2 px-3">Categories</p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all",
                    activeCategory === null 
                      ? "bg-white/10 text-white font-medium" 
                      : "text-slate-400 hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(activeCategory === null ? "text-indigo-400" : "text-slate-500")}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    </span>
                    <span className="text-xs">All Problems</span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {PROBLEMS.length}
                  </span>
                </button>
                {CATEGORIES.map(category => {
                  const count = PROBLEMS.filter(p => p.categoryId === category.id).length;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all",
                        activeCategory === category.id
                          ? "bg-white/10 text-white font-medium" 
                          : "text-slate-400 hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className={cn("w-1 h-1 rounded-full", activeCategory === category.id ? "bg-indigo-400" : "bg-slate-600")} />
                        <span className="text-xs truncate">{category.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {activeCategory 
                ? CATEGORIES.find(c => c.id === activeCategory)?.title 
                : searchQuery ? 'Search Results' : 'All Problems'}
            </h2>
            <span className="text-sm text-neutral-500">{filteredProblems.length} results</span>
          </div>

          {filteredProblems.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-white/5 rounded-2xl bg-white/[0.02]">
              <Search className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No problems found</h3>
              <p className="text-neutral-400">Try adjusting your search query or category filter.</p>
              <button 
                onClick={() => { setSearchParams(new URLSearchParams()); setActiveCategory(null); }}
                className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-sm text-white"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
