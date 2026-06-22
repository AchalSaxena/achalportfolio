import pg from 'pg';

const { Client } = pg;

// Read database connection string from env variables for security
const connectionString = process.env.DATABASE_URL;

const PROJECTS = [
  {
    title: 'Admission & Examination Management System',
    description: 'A comprehensive full-stack solution built to automate the student registration, verification, examination scheduling, and results publishing lifecycle. Reduced manual operations by 60% and automated workflows for 5,000+ active users annually.',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    tags: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS', 'Bootstrap'],
    github_url: 'https://github.com/AchalSaxena',
    demo_url: 'https://github.com/AchalSaxena',
    category: 'Full Stack',
    views: 312
  },
  {
    title: 'Government Workflow Automation Systems',
    description: 'Designed and deployed secure digital workflow platforms for high-volume government processes (Department of Commerce DGFT). Standardized process digitization, FRS mapping, and stakeholder coordination pipelines, resulting in a 30% reduction in processing overhead.',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    tags: ['PHP', 'Laravel', 'Linux', 'REST APIs', 'Agile', 'SDLC'],
    github_url: 'https://github.com/AchalSaxena',
    demo_url: 'https://github.com/AchalSaxena',
    category: 'Cloud / DevOps',
    views: 245
  },
  {
    title: 'API-Based Educational Platform',
    description: 'An API-driven platform built for PSSCIVE, NCERT (Ministry of Education) supporting online curricula and training. Implemented caching mechanisms, custom endpoint logging, and backend database optimization, boosting content delivery speed by 45%.',
    image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    tags: ['PHP', 'Laravel', 'JavaScript', 'REST APIs', 'MySQL', 'Drupal'],
    github_url: 'https://github.com/AchalSaxena',
    demo_url: 'https://github.com/AchalSaxena',
    category: 'Full Stack',
    views: 189
  },
  {
    title: 'Payroll Management System',
    description: 'Automated institutional payroll engine managing dynamic salary structures, tax deductions, compliance reporting, and slip generation. Halved payment processing error rates and optimized query speeds for bulk payroll calculations.',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    tags: ['PHP', 'Laravel', 'MySQL', 'Cron Jobs', 'Data Integrity'],
    github_url: 'https://github.com/AchalSaxena',
    demo_url: 'https://github.com/AchalSaxena',
    category: 'Full Stack',
    views: 134
  }
];

async function run() {
  if (!connectionString) {
    console.error('Error: DATABASE_URL environment variable is missing.');
    console.log('To run this script, set DATABASE_URL, for example:');
    console.log('DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres node supabase/updateProjectsDb.js');
    process.exit(1);
  }

  const client = new Client({ connectionString });
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected.');

    console.log('Truncating projects table...');
    await client.query('TRUNCATE public.projects;');

    console.log('Inserting seeded projects...');
    for (const proj of PROJECTS) {
      const query = `
        INSERT INTO public.projects (title, description, image_url, tags, github_url, demo_url, category, views)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      await client.query(query, [
        proj.title,
        proj.description,
        proj.image_url,
        proj.tags,
        proj.github_url,
        proj.demo_url,
        proj.category,
        proj.views
      ]);
    }
    
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Database sync error:', error);
  } finally {
    await client.end();
  }
}

run();
