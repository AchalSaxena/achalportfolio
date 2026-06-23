import { Cpu, Award, Milestone, GraduationCap, ShieldCheck, ClipboardCheck } from 'lucide-react';

export default function About() {
  const skills = [
    // Frontend
    { name: 'React', category: 'frontend', icon: <Cpu className="w-3 h-3" /> },
    { name: 'JavaScript', category: 'frontend', icon: <Cpu className="w-3 h-3" /> },
    { name: 'Tailwind CSS', category: 'frontend', icon: <Cpu className="w-3 h-3" /> },
    // Backend
    { name: 'PHP', category: 'backend', icon: <Cpu className="w-3 h-3" /> },
    { name: 'Laravel', category: 'backend', icon: <Cpu className="w-3 h-3" /> },
    { name: 'MySQL', category: 'backend', icon: <Cpu className="w-3 h-3" /> },
    // Tools
    { name: 'Git', category: 'tools', icon: <Cpu className="w-3 h-3" /> },
    { name: 'Linux', category: 'tools', icon: <Cpu className="w-3 h-3" /> },
    { name: 'WordPress', category: 'tools', icon: <Cpu className="w-3 h-3" /> },
    { name: 'Drupal', category: 'tools', icon: <Cpu className="w-3 h-3" /> },
    { name: 'REST APIs', category: 'tools', icon: <Cpu className="w-3 h-3" /> },
    // Methodologies
    { name: 'SDLC', category: 'governance', icon: <Cpu className="w-3 h-3" /> },
    { name: 'Agile Dev', category: 'governance', icon: <Cpu className="w-3 h-3" /> },
    { name: 'Requirement Analysis', category: 'governance', icon: <Cpu className="w-3 h-3" /> },
    { name: 'Workflow Docs', category: 'governance', icon: <Cpu className="w-3 h-3" /> },
  ];

  const stats = [
    { count: '10 Yrs', label: 'E-Gov & IT Experience', icon: <Award className="w-5 h-5 text-brand-cyan" /> },
    { count: '60%', label: 'Manual Effort Reduced', icon: <Milestone className="w-5 h-5 text-brand-cyan" /> },
    { count: '99.9%', label: 'System Uptime Maintained', icon: <Cpu className="w-5 h-5 text-brand-cyan" /> },
  ];

  const certifications = [
    { title: 'Executing Large Scale Digital Transformation Projects', issuer: 'NeGD, MeitY, Govt. of India', date: 'May 2026' },
    { title: 'Implementation of National IT Projects in Government Sector', issuer: 'NeGD, MeitY, Govt. of India', date: 'May 2026' },
    { title: 'Digital Transformation: Effective Procurement & Project Management', issuer: 'NeGD, MeitY, Govt. of India', date: 'May 2026' },
    { title: 'Digital Transformation: Financial Reporting & Analytical System', issuer: 'NeGD, MeitY, Govt. of India', date: 'May 2026' },
    { title: 'Cyber Security and Strategy', issuer: 'IIPA, Karmayogi Bharat', date: 'Dec 2023' },
    { title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', date: 'Apr 2026' },
  ];

  return (
    <section id="about" className="py-24 px-4 md:px-8 max-w-6xl mx-auto border-b border-light-border">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-navy mb-4">
          IT Consulting & <span className="text-gradient">GovTech Stack</span>
        </h2>
        <p className="text-slate-500 text-base max-w-xl mx-auto">
          10 years of driving digital transformation initiatives, custom enterprise applications, and secure systems in the public sector.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Bio Card (Col-span 2) */}
        <div className="col-span-1 md:col-span-2 glass-panel p-8 flex flex-col justify-between min-h-[300px] bento-glow-navy group">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-brand-navy/5 border border-brand-navy/10 text-brand-navy group-hover:scale-105 transition-transform duration-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy">Professional Summary</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              I am an IT Consultant and Full Stack Developer specialized in delivering digital transformation and e-Governance solutions for Government of India departments and state institutions (DGFT Department of Commerce, Department of Consumer Affairs, NCERT, Ministry of Education).
            </p>
            <p className="text-slate-600 leading-relaxed">
              I translate operational and policy requirements into secure, high-availability technical systems. My focus areas include workflow automation, FRS/DPR analysis, stakeholder coordination, and system performance modernization.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
            <span>// Mumbai, Maharashtra</span>
            <span>// e-Governance Expert</span>
            <span>// Secure Infrastructure</span>
          </div>
        </div>

        {/* Stats Card (Col-span 1) */}
        <div className="col-span-1 glass-panel p-8 flex flex-col justify-between gap-6 bento-glow-cyan group">
          <h3 className="font-display text-lg font-bold text-brand-navy mb-2">Key Metrics</h3>
          <div className="flex flex-col gap-6 w-full">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-50 border border-light-border p-4 rounded-xl hover:bg-slate-100/70 transition-colors">
                <div className="p-2 rounded-lg bg-white border border-light-border shadow-sm">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-brand-navy font-display leading-none mb-1">
                    {stat.count}
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Category Board (Col-span 1, Row-span 2 on MD) */}
        <div className="col-span-1 glass-panel p-8 bento-glow-slate group flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-slate-100 border border-light-border text-brand-slate group-hover:scale-105 transition-transform duration-300">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy">Core Competencies</h3>
            </div>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Proven technologies, consulting practices, and methodologies implemented across departments:
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                    skill.category === 'frontend'
                      ? 'bg-slate-50 border-light-border text-brand-slate hover:border-brand-cyan/40 hover:text-brand-cyan hover:shadow-sm'
                      : skill.category === 'backend'
                      ? 'bg-brand-cyan/5 border-brand-cyan/20 text-brand-cyan hover:border-brand-cyan/60 hover:shadow-sm'
                      : skill.category === 'tools'
                      ? 'bg-slate-100 border-light-border text-brand-navy hover:border-brand-cyan/40 hover:text-brand-cyan hover:shadow-sm'
                      : 'bg-emerald-50 border-emerald-200/60 text-emerald-600 hover:border-emerald-500 hover:shadow-sm'
                  }`}
                >
                  {skill.icon}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications (Col-span 2) */}
        <div className="col-span-1 md:col-span-2 glass-panel p-8 bento-glow-cyan flex flex-col justify-between group">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-brand-cyan/5 border border-brand-cyan/15 text-brand-cyan group-hover:scale-105 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy">NeGD & Govt Governance Credentials</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex gap-3 items-start p-3 bg-slate-50 hover:bg-slate-100/60 border border-light-border rounded-xl transition-all duration-300">
                  <ClipboardCheck className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy leading-snug line-clamp-2">{cert.title}</h4>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">{cert.issuer} &middot; {cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
