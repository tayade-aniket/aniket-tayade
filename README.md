# Aniket Tayade - Personal Portfolio

A modern, responsive portfolio website built with Next.js, showcasing my journey as a Full Stack Developer and UI/UX Designer.

## 🌟 Live Demo

Visit my portfolio at: [theanikettayade.com](https://theanikettayade.com)

## 🚀 About Me

I'm Aniket Tayade, a passionate Full Stack Developer with expertise in modern web technologies. This portfolio represents my journey, skills, and the projects I've crafted with dedication and creativity.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Email**: EmailJS / Resend

## ✨ Features

- 🎨 **Modern Design**: Clean, minimalist interface with smooth animations
- 📱 **Fully Responsive**: Optimized for all devices and screen sizes
- 🌙 **Dark Mode**: Beautiful dark/light theme toggle
- ⚡ **Performance**: Optimized with Next.js 14 and modern best practices
- 🔍 **SEO Optimized**: Meta tags, Open Graph, and structured data
- 📝 **Blog System**: Dynamic blog with markdown support
- 💼 **Project Showcase**: Interactive project gallery with live demos
- 📧 **Contact Form**: Functional contact form with email integration
- 🔐 **Real-time Updates**: Powered by Supabase for dynamic content

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (pages)/           # Page routes
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── ui/               # UI components
│   ├── sections/         # Page sections
│   └── common/           # Common components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase client
│   ├── utils.ts          # Helper functions
│   └── validations.ts    # Form validations
├── public/               # Static assets
│   ├── images/           # Images and icons
│   └── docs/             # Documents and resume
├── scripts/              # Build and deployment scripts
└── styles/               # Additional styles
```

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tayade-aniket/aniket-tayade.git
   cd aniket-tayade
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Email Configuration
   EMAILJS_SERVICE_ID=your_emailjs_service_id
   EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   
   # Analytics (Optional)
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   ```

4. **Database Setup**
   
   Set up your Supabase database with the following tables:
   - `projects` - Portfolio projects
   - `blogs` - Blog posts  
   - `skills` - Technical skills
   - `experiences` - Work experience
   - `contact_messages` - Contact form submissions

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy on Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables

## 📱 Pages & Sections

- **Home**: Hero section with introduction and call-to-action
- **About**: Detailed information about my background and skills
- **Projects**: Showcase of my best work with live demos
- **Experience**: Professional journey and achievements  
- **Blog**: Technical articles and insights
- **Contact**: Get in touch form and social links

## 🎨 Customization

### Updating Content

1. **Personal Information**: Edit `lib/data/personal.ts`
2. **Projects**: Update `lib/data/projects.ts` 
3. **Skills**: Modify `lib/data/skills.ts`
4. **Theme Colors**: Customize in `tailwind.config.ts`

### Adding New Sections

1. Create component in `components/sections/`
2. Add to page layout in `app/(pages)/`
3. Update navigation if needed

## 🤝 Contributing

While this is a personal portfolio, I welcome suggestions and improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful styling
- [Supabase](https://supabase.com/) - Backend as a service
- [Framer Motion](https://www.framer.com/motion/) - For smooth animations
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Vercel](https://vercel.com/) - For seamless deployment

## 📬 Contact

**Aniket Tayade**
- Portfolio: [theanikettayade.com](https://theanikettayade.com)
- LinkedIn: [linkedin.com/in/aniket-tayade](https://linkedin.com/in/aniket-tayade)
- GitHub: [github.com/tayade-aniket](https://github.com/tayade-aniket)
- Email: aniket@theanikettayade.com

---

⭐ **If you like this project, please give it a star!** ⭐

*Built with ❤️ by Aniket Tayade*
