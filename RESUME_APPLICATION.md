# Harsha Muniraju - Professional Resume Website

## Overview

A modern, interactive resume website built with React, TypeScript, and AI-powered chatbot capabilities. Features a sleek dark theme with gradient accents, smooth animations, and an intelligent AI assistant powered by Groq's LLM API.

**Live Site:** https://harsha-muniraju-resume.netlify.app

---

## Professional Summary

**Harsha Muniraju, MBA**  
Data and AI Transformational Executive, Chief Data Office, AT&T Inc.

Visionary Data & AI executive with 15+ years architecting enterprise-scale data, cloud, and AI capabilities at Fortune 50 scale. Trusted advisor to C-suite and Board on AI strategy, Responsible AI governance, and value creation.

### Key Achievements
- Built and scaled AT&T's 400-member global Chief Data Office from inception
- Manages 760+ petabytes of enterprise data
- Delivered $70M+ in organizational savings
- Productionized 20+ GenAI products serving 1,000+ users
- Achieved >90% team retention rate

---

## Technical Stack

### Frontend
- **Framework:** React 19.2.6 with TypeScript 6.0.2
- **Build Tool:** Vite 8.0.12
- **Styling:** TailwindCSS 4.3.0
- **Icons:** Lucide React 1.16.0
- **Markdown:** React Markdown 10.1.0

### AI/Chatbot
- **LLM Provider:** Groq API (Llama 3.3 70B Versatile)
- **Architecture:** RAG (Retrieval-Augmented Generation)
- **Vector Search:** Custom TF-IDF with cosine similarity
- **Knowledge Base:** 30+ structured resume chunks with keyword indexing

### Deployment
- **Hosting:** Netlify
- **CI/CD:** GitHub Actions (automatic deployment on push to main)
- **Domain:** Custom Netlify subdomain

---

## Features

### 1. Interactive AI Chatbot
- **RAG-based knowledge retrieval** from structured resume data
- **Semantic search** using TF-IDF vectorization and cosine similarity
- **Context-aware responses** with conversation history
- **Suggested prompts** for common questions
- **Out-of-scope handling** with friendly fallback messages

#### Sample Questions the Chatbot Can Answer:
- "What does Harsha do?"
- "AI & GenAI skills?"
- "Education background?"
- "Experience at AT&T?"
- "What value does Harsha bring?"
- "How can he help with growth?"
- "Can he handle compliance?"

### 2. Responsive Design
- **Mobile-first approach** with breakpoints for tablet and desktop
- **Fixed navigation** with smooth scroll behavior
- **Optimized scroll-to-top** on page load (works on mobile and desktop)
- **Touch-friendly** interface elements

### 3. Visual Design
- **Dark theme** with gradient backgrounds
- **Glassmorphism effects** using backdrop blur
- **Smooth animations** and transitions
- **Professional photography** from Unsplash
- **Custom LinkedIn icon** SVG

### 4. Content Sections
- **Hero Section:** Profile photo, title, contact info, AI chatbot
- **Executive Summary:** Key metrics and achievements
- **Professional Experience:** Timeline-based work history
- **Skills:** Categorized technical competencies
- **Education & Certifications:** Academic and professional credentials
- **Contact:** Multiple contact methods

---

## Project Structure

```
harsha-resume/
├── public/
│   └── harsha-profile.webp          # Profile photo
├── src/
│   ├── components/
│   │   ├── InlineChatbot.tsx        # AI chatbot component
│   │   └── Chatbot.tsx              # Alternative chatbot (unused)
│   ├── data/
│   │   └── resumeChunks.ts          # RAG knowledge base (209 lines)
│   ├── App.tsx                      # Main application (458 lines)
│   ├── main.tsx                     # React entry point
│   └── index.css                    # Global styles
├── index.html                       # HTML template with scroll fix
├── netlify.toml                     # Netlify configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── vite.config.ts                   # Vite configuration
├── .env.example                     # Environment variables template
└── README.md                        # Project documentation
```

---

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Groq API key (free tier available at https://console.groq.com)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hmuniraju1981/harshas-resume.git
   cd harshas-resume
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Groq API key:
   ```
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:5173

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## RAG Knowledge Base Structure

The chatbot uses a structured knowledge base with 30+ chunks organized by category:

### Categories
- **identity:** Name, contact information, location
- **summary:** Executive summary and key achievements
- **skills:** Technical competencies (AI, MLOps, Data, Cloud, Governance, Programming, Leadership)
- **experience:** Detailed work history at AT&T, Mindtree, Tesco Bank, and earlier roles
- **education:** Academic degrees and programs
- **certifications:** Professional certifications
- **strategic-value:** High-level value propositions and strategic questions

### Chunk Structure
```typescript
interface ResumeChunk {
  id: string;           // Unique identifier
  category: string;     // Category for organization
  content: string;      // Full text content
  keywords: string[];   // Search keywords for matching
}
```

### Retrieval Algorithm
1. **Tokenization:** Query and chunks converted to lowercase tokens
2. **Vectorization:** TF-IDF-style word frequency vectors
3. **Similarity:** Cosine similarity between query and chunk vectors
4. **Ranking:** Top 4 chunks with similarity > 0.05
5. **Context:** Retrieved chunks sent to LLM as context

---

## Deployment

### Netlify Deployment

The site is configured for automatic deployment via Netlify:

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`
- Framework: Vite (React)

**Redirects:**
- All routes redirect to `/index.html` for SPA support

**Deploy Commands:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to production
netlify deploy --prod
```

### GitHub Integration
- **Repository:** https://github.com/hmuniraju1981/harshas-resume
- **Branch:** main
- **Auto-deploy:** Enabled on push to main

---

## Key Technical Decisions

### 1. Scroll-to-Top Fix
**Problem:** Page scrolled down on load, especially on mobile devices.

**Solution:**
- Inline script in `index.html` to disable scroll restoration before React loads
- `useEffect` hook in `App.tsx` with immediate and delayed scroll-to-top
- Multi-layered approach ensures compatibility across browsers

### 2. RAG Implementation
**Why custom RAG instead of external vector DB:**
- Lightweight and fast for small knowledge base (30 chunks)
- No external dependencies or API calls for retrieval
- Simple TF-IDF + cosine similarity sufficient for resume data
- Reduces latency and cost

### 3. Groq API Choice
**Why Groq over OpenAI:**
- Free tier: 30 requests/min, 14,400 requests/day
- Fast inference (Llama 3.3 70B)
- Compatible with OpenAI API format
- Cost-effective for personal projects

### 4. Component Architecture
**InlineChatbot vs Chatbot:**
- `InlineChatbot.tsx`: Embedded in hero section, always visible
- `Chatbot.tsx`: Alternative floating chatbot (not currently used)
- Modular design allows easy switching between implementations

---

## Performance Optimizations

### Build Optimizations
- **Code splitting:** Vite automatically splits vendor and app code
- **Tree shaking:** Unused code eliminated
- **Minification:** CSS and JS minified in production
- **Gzip compression:** Netlify serves gzipped assets

### Bundle Sizes
- `index.html`: 0.90 kB (gzipped: 0.49 kB)
- `index.css`: 35.39 kB (gzipped: 6.19 kB)
- `index.js`: ~240 kB (gzipped: ~75 kB)

### Runtime Optimizations
- **Lazy loading:** Images loaded on demand
- **Smooth scroll:** CSS-based smooth scrolling
- **Debounced inputs:** Chatbot input debounced to prevent excessive API calls
- **Message history:** Limited to last 6 messages to reduce token usage

---

## Environment Variables

### Required
```bash
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### Optional (for development)
```bash
VITE_API_URL=http://localhost:3000  # If using custom backend
```

---

## Contact Information

**Harsha Muniraju**
- **Location:** Dallas, TX 75407
- **Phone:** 945-426-8797
- **Email:** harsha.muniraju1981@gmail.com
- **LinkedIn:** https://linkedin.com/in/harshamuniraju
- **Website:** https://harsha-muniraju-resume.netlify.app

---

## License

© 2026 Harsha Muniraju. All rights reserved.

---

## Changelog

### Version 1.3 (May 16, 2026)
- Added friendlier out-of-scope chatbot message
- Added strategic value proposition prompts to chatbot

### Version 1.2 (May 16, 2026)
- Added 3 strategic Q&A chunks to RAG knowledge base
- Enhanced chatbot with 9 suggested prompts

### Version 1.1 (May 15, 2026)
- Fixed mobile scroll-to-top issue
- Enhanced scroll restoration handling

### Version 1.0 (May 14, 2026)
- Initial release
- React + TypeScript + Vite setup
- AI chatbot with RAG
- Responsive design
- Netlify deployment

---

## Future Enhancements

### Potential Features
- [ ] Download resume as PDF
- [ ] Dark/light theme toggle
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] Blog section
- [ ] Project portfolio showcase
- [ ] Testimonials section
- [ ] Video introduction
- [ ] Advanced chatbot with voice input
- [ ] Integration with calendar for scheduling

### Technical Improvements
- [ ] Implement proper vector database (Pinecone/Weaviate)
- [ ] Add unit tests (Vitest)
- [ ] Add E2E tests (Playwright)
- [ ] Implement caching for chatbot responses
- [ ] Add rate limiting for API calls
- [ ] Optimize image loading with WebP/AVIF
- [ ] Implement service worker for offline support
- [ ] Add SEO optimizations (meta tags, sitemap)

---

## Acknowledgments

- **UI Inspiration:** Modern portfolio designs
- **Icons:** Lucide React
- **Images:** Unsplash
- **LLM:** Groq (Llama 3.3 70B)
- **Hosting:** Netlify
- **Framework:** React Team
- **Build Tool:** Vite Team
