import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { ExternalLink, Eye, X, Filter } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  github_url: string;
  demo_url: string;
  category: string;
  views: number;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: 'mock-1',
    title: 'Admission & Examination Management System',
    description: 'A comprehensive full-stack solution built to automate the student registration, verification, examination scheduling, and results publishing lifecycle. Reduced manual operations by 60% and automated workflows for 5,000+ active users annually.',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    tags: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS', 'Bootstrap'],
    github_url: 'https://github.com/AchalSaxena',
    demo_url: 'https://github.com/AchalSaxena',
    category: 'Full Stack',
    views: 312,
  },
  {
    id: 'mock-2',
    title: 'Government Workflow Automation Systems',
    description: 'Designed and deployed secure digital workflow platforms for high-volume government processes (Department of Commerce DGFT). Standardized process digitization, FRS mapping, and stakeholder coordination pipelines, resulting in a 30% reduction in processing overhead.',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    tags: ['PHP', 'Laravel', 'Linux', 'REST APIs', 'Agile', 'SDLC'],
    github_url: 'https://github.com/AchalSaxena',
    demo_url: 'https://github.com/AchalSaxena',
    category: 'Cloud / DevOps',
    views: 245,
  },
  {
    id: 'mock-3',
    title: 'API-Based Educational Platform',
    description: 'An API-driven platform built for PSSCIVE, NCERT (Ministry of Education) supporting online curricula and training. Implemented caching mechanisms, custom endpoint logging, and backend database optimization, boosting content delivery speed by 45%.',
    image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    tags: ['PHP', 'Laravel', 'JavaScript', 'REST APIs', 'MySQL', 'Drupal'],
    github_url: 'https://github.com/AchalSaxena',
    demo_url: 'https://github.com/AchalSaxena',
    category: 'Full Stack',
    views: 189,
  },
  {
    id: 'mock-4',
    title: 'Payroll Management System',
    description: 'Automated institutional payroll engine managing dynamic salary structures, tax deductions, compliance reporting, and slip generation. Halved payment processing error rates and optimized query speeds for bulk payroll calculations.',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',

    tags: ['PHP', 'Laravel', 'MySQL', 'Cron Jobs', 'Data Integrity'],
    github_url: 'https://github.com/AchalSaxena',
    demo_url: 'https://github.com/AchalSaxena',
    category: 'Full Stack',
    views: 134,
  }
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // 1. Fetch projects from Supabase or load mock list
  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('views', { ascending: false });

          if (error) throw error;
          if (data && data.length > 0) {
            setProjects(data as Project[]);
          } else {
            setProjects(MOCK_PROJECTS);
          }
        } catch (err) {
          console.error('Failed to fetch projects from Supabase, loading mocks:', err);
          setProjects(MOCK_PROJECTS);
        }
      } else {
        setProjects(MOCK_PROJECTS);
      }
      setLoading(false);
    }

    loadProjects();
  }, []);

  // 2. Increment project views count on modal selection
  const handleOpenModal = async (project: Project) => {
    setSelectedProject(project);

    // Save increment
    const updatedViews = project.views + 1;

    // Update local state
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, views: updatedViews } : p))
    );

    if (isSupabaseConfigured && supabase && !project.id.startsWith('mock-')) {
      try {
        await supabase
          .from('projects')
          .update({ views: updatedViews })
          .eq('id', project.id);
      } catch (err) {
        console.error('Failed to increment project view in Supabase:', err);
      }
    } else {
      // LocalStorage increment for mock views
      const key = `local_views_proj_${project.id}`;
      const savedViews = localStorage.getItem(key);
      const val = savedViews ? parseInt(savedViews, 10) + 1 : updatedViews;
      localStorage.setItem(key, val.toString());

      setSelectedProject(prev => prev ? { ...prev, views: val } : null);
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, views: val } : p))
      );
    }
  };

  const categories = ['All', 'Frontend', 'Full Stack', 'Cloud / DevOps'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <section id="projects" className="py-24 px-4 md:px-8 max-w-6xl mx-auto border-b border-light-border">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-navy mb-4">
          e-Governance & <span className="text-gradient">System Solutions</span>
        </h2>
        <p className="text-slate-500 text-base max-w-xl mx-auto">
          Production digital platforms, institutional portals, and automated databases deployed across ministries and organizations.
        </p>
      </div>

      {/* Categories Filters bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono uppercase mr-2">
          <Filter className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Category filter:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${filter === cat
                ? 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30 shadow-sm'
                : 'bg-white border-light-border text-slate-500 hover:text-brand-navy hover:border-brand-cyan/40 shadow-sm'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Projects Listing */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-500 text-sm font-mono">Fetching database records...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-light-border rounded-2xl bg-white shadow-sm">
          <p className="text-slate-500 font-semibold">No systems registered in: {filter}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenModal(project)}
              className="glass-panel group flex flex-col justify-between p-8 cursor-pointer border border-light-border hover:border-brand-cyan/40 bg-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <div>
                {/* Card Header Metadata */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="bg-brand-navy/5 text-brand-navy border border-brand-navy/10 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{project.views}</span>
                  </div>
                </div>

                {/* Card Title & Description */}
                <h3 className="font-display font-bold text-xl text-brand-navy group-hover:text-brand-cyan transition-colors mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-4 mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tag Pills */}
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-medium border bg-slate-50 border-light-border text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium border bg-slate-50 border-light-border text-slate-400">
                      +{project.tags.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Glassmorphic Popup Modal (Light Mode styling) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel w-full max-w-2xl bg-white border border-brand-cyan/40 overflow-hidden shadow-2xl animate-float-medium relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-brand-navy border border-light-border transition-colors shadow-sm z-10"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Category Badge & View count */}
              <div className="flex items-center gap-4 mb-4 mt-2">
                <span className="bg-brand-navy/5 text-brand-navy border border-brand-navy/10 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider font-sans">
                  {selectedProject.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-brand-cyan bg-brand-cyan/5 border border-brand-cyan/20 px-3 py-1 rounded-full w-fit">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{selectedProject.views} unique dashboard loads</span>
                </div>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-brand-navy mb-4 pr-10">
                {selectedProject.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Extended Tags */}
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold mb-2">Integrated Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md text-xs font-mono border bg-slate-50 border-light-border text-brand-slate"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 border-t border-light-border pt-6">
                <a
                  href={selectedProject.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-brand-navy to-brand-slate text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 hover:opacity-95 shadow-md shadow-brand-navy/10"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch System Portal</span>
                </a>
                <a
                  href={selectedProject.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-white hover:bg-slate-50 text-brand-navy border border-light-border text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 shadow-sm"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span>Browse Source Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
