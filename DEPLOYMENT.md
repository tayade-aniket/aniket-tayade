# Deployment Guide

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **GitHub Repository**: Push your code to GitHub

## Step 1: Set up Supabase Database

1. Create a new Supabase project
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL scripts in order:
   - `scripts/01-create-tables.sql`
   - `scripts/02-seed-data.sql`

4. Get your project credentials:
   - Go to Settings > API
   - Copy the Project URL and anon public key

## Step 2: Configure Authentication

1. In Supabase dashboard, go to Authentication > Users
2. Create an admin user:
   - Email: `aniket@example.com`
   - Password: `admin123`
   - Or use your own credentials

3. Go to Authentication > Settings
4. Configure your site URL (will be your Vercel domain)

## Step 3: Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

3. Deploy the project

## Step 4: Configure Domain (Optional)

1. Add your custom domain in Vercel settings
2. Update the site URL in Supabase Authentication settings

## Step 5: Test the Application

1. Visit your deployed site
2. Test the public portfolio pages
3. Login to admin panel at `/admin/login`
4. Test CRUD operations for projects, blog posts, and skills

## Environment Variables

Create a `.env.local` file for local development:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

## Database Schema

The application uses the following tables:
- `projects` - Portfolio projects
- `blog_posts` - Blog articles
- `skills` - Technical skills
- `resume` - Resume files
- `profiles` - User profiles (extends auth.users)

## Security Features

- Row Level Security (RLS) enabled on all tables
- Public read access for published content
- Admin-only write access
- Secure authentication with Supabase Auth

## Performance Optimizations

- Static generation for public pages
- API routes for dynamic content
- Optimized images with Next.js Image component
- Efficient database queries with proper indexing

## Monitoring and Analytics

Consider adding:
- Vercel Analytics
- Supabase Dashboard monitoring
- Error tracking (Sentry)
- Performance monitoring

## Backup Strategy

- Supabase provides automatic backups
- Export data regularly for additional safety
- Version control for code changes

## Support

For issues or questions:
1. Check Supabase documentation
2. Check Vercel documentation
3. Review application logs in respective dashboards
