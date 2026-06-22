import { MapPin } from 'lucide-react';

interface Position {
  role: string;
  organization: string;
  location: string;
  duration: string;
  achievements: string[];
  gradientClass: string;
  borderClass: string;
  bulletColor: string;
}

export default function Experience() {
  const experiences: Position[] = [
    {
      role: 'IT Professional | Digital Transformation & Full Stack Solutions',
      organization: 'Department of Commerce (DGFT), Mumbai',
      location: 'Mumbai, Maharashtra',
      duration: 'Jan 2025 – Present',
      achievements: [
        'Designed and implemented scalable digital workflow solutions for high-volume government operations.',
        'Delivered enterprise digital platforms improving operational accessibility and workflow efficiency.',
        'Improved processing efficiency and system performance for critical digital workflows.',
        'Implemented deployment monitoring and automation mechanisms, reducing deployment time by 30%.',
        'Contributed to high-availability government systems with secure architecture and optimized backend logic.',
        'Collaborated with stakeholders for workflow improvements and process digitization.',
        'Assisted in technical documentation, requirement gathering, and workflow discussions for digital governance initiatives.'
      ],
      gradientClass: 'from-[#0d072b] to-[#3b0764]',
      borderClass: 'border-purple-500/30 hover:border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.05)]',
      bulletColor: 'text-purple-400'
    },
    {
      role: 'IT Professional (Full Stack Developer)',
      organization: 'Department of Consumer Affairs, Government of India',
      location: 'New Delhi / Remote',
      duration: 'Feb 2022 – Dec 2024',
      achievements: [
        'Supported end-to-end implementation of scalable government digital applications.',
        'Improved enterprise application performance through backend optimization and system modernization.',
        'Reduced server load by 25% through backend optimization and improved database architecture.',
        'Designed secure backup systems and data integrity mechanisms ensuring 99.9% uptime.',
        'Delivered scalable citizen-facing applications supporting large user volumes and critical workflows.',
        'Worked closely with departments to modernize manual systems into digital workflows, assisted in workflow analysis and operational process digitization initiatives.'
      ],
      gradientClass: 'from-[#1c1205] to-[#78350f]',
      borderClass: 'border-amber-500/30 hover:border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.05)]',
      bulletColor: 'text-amber-400'
    },
    {
      role: 'Programmer (Full Stack Developer)',
      organization: 'PSSCIVE, NCERT Ministry of Education',
      location: 'Bhopal, India',
      duration: 'Sep 2021 – Feb 2022',
      achievements: [
        'Developed educational platforms aligned with national digital education initiatives.',
        'Modernized legacy systems into optimized Laravel-based architecture.',
        'Improved platform performance by 35% while reducing maintenance complexity.',
        'Built responsive interfaces and optimized backend workflows.'
      ],
      gradientClass: 'from-[#021f11] to-[#047857]',
      borderClass: 'border-emerald-500/30 hover:border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.05)]',
      bulletColor: 'text-emerald-400'
    },
    {
      role: 'Analyst & Programmer (Full Stack Developer)',
      organization: 'MSRVVP, Ministry of Education',
      location: 'Ujjain, India',
      duration: 'Oct 2018 – Jul 2021',
      achievements: [
        'Developed Admission & Examination Management System using Laravel, MySQL, and Tailwind CSS.',
        'Automated workflows for 5,000+ users annually, reducing manual processes by 60%.',
        'Implemented role-based secure access systems and optimized data workflows.',
        'Gathered functional requirements and transformed them into scalable digital solutions.',
        'Improved operational efficiency through process automation and system optimization.'
      ],
      gradientClass: 'from-[#1a051d] to-[#701a75]',
      borderClass: 'border-fuchsia-500/30 hover:border-fuchsia-500/60 shadow-[0_0_15px_rgba(217,70,239,0.05)]',
      bulletColor: 'text-fuchsia-400'
    },
    {
      role: 'Programmer (Full Stack Developer)',
      organization: 'Shriji Takniki Evam Vanijyik Prashikshan Sansthan, Ujjain',
      location: 'Ujjain, India',
      duration: 'Jun 2016 – Sep 2018',
      achievements: [
        'Developed responsive websites, institutional portals, and internal web tools.',
        'Improved digital engagement by 40% through SEO optimization and responsive UI enhancements.',
        'Conducted technical training sessions on web development and SEO.',
        'Managed frontend and backend development activities for multiple web projects.'
      ],
      gradientClass: 'from-[#031d24] to-[#0e7490]',
      borderClass: 'border-cyan-500/30 hover:border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.05)]',
      bulletColor: 'text-brand-cyan'
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 md:px-8 bg-[#030014] text-white relative overflow-hidden">
      {/* Background radial gradient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 relative z-10">
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Work <span className="text-brand-cyan">Experience</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-sans">
            Over 9 years of dedicated service in full stack development, workflow automation, and digital transformation for Government of India initiatives.
          </p>
        </div>

        {/* Side-by-side Capsule layout list */}
        <div className="space-y-8 relative z-10">
          {experiences.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Capsule - Solid Gradient card (span 5 columns on large screens) */}
              <div className={`lg:col-span-5 rounded-[40px] bg-gradient-to-r ${exp.gradientClass} p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_30px_rgba(0,0,0,0.4)]`}>
                {/* Decorative background grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="text-xs uppercase font-mono tracking-widest text-slate-300 bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-6">
                    {exp.duration}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4 group-hover:text-brand-cyan transition-colors">
                    {exp.role}
                  </h3>
                </div>

                <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                  <div className="font-sans text-lg font-bold text-white mb-2">
                    {exp.organization}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-300 font-mono">
                    <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Right Capsule - Outlined description card (span 7 columns on large screens) */}
              <div className={`lg:col-span-7 rounded-[40px] border-2 bg-slate-950/20 backdrop-blur-md ${exp.borderClass} p-8 sm:p-10 flex flex-col justify-center transition-all duration-300 hover:-translate-y-1`}>
                <ul className="space-y-4">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
                      <span className={`font-bold select-none ${exp.bulletColor} text-lg leading-none mt-0.5`}>•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
