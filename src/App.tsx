import { Mail, MapPin, Phone, GraduationCap, Award, Code, Users, TrendingUp, ChevronDown, Database, Shield, Brain, Building2, Cpu } from 'lucide-react'
import './index.css'
import InlineChatbot from './components/InlineChatbot'

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-cyan-500/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            HARSHA MUNIRAJU
          </span>
          <div className="hidden md:flex gap-8 text-sm text-gray-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
          <div className="flex gap-3">
            <a href="mailto:harsha.muniraju1981@gmail.com" className="p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 transition-colors border border-white/10">
              <Mail size={18} />
            </a>
            <a href="https://linkedin.com/in/harshamuniraju" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 transition-colors border border-white/10">
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
            alt="Technology background"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/80 to-gray-950"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-52 h-64 md:w-64 md:h-80 mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 border-4 border-cyan-400/20">
            <img src="/harsha-profile.webp" alt="Harsha Muniraju" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
              Harsha Muniraju
            </span>
            <span className="text-lg sm:text-xl md:text-2xl text-cyan-300 font-semibold ml-3 align-middle">
              MBA
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
            Data and AI Technology Enabled Executive, Chief Data Office, AT&T Inc
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Visionary Data & AI executive with 15+ years architecting enterprise-scale data, cloud, and AI capabilities at Fortune 50 scale. Trusted advisor to C-suite and Board on AI strategy, Responsible AI governance, and value creation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <a href="mailto:harsha.muniraju1981@gmail.com" className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-medium hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
              Contact Me
            </a>
            <a href="https://linkedin.com/in/harshamuniraju" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-cyan-500/30 rounded-full font-medium hover:bg-cyan-500/10 transition-all text-cyan-300">
              LinkedIn
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-500 justify-center text-xs md:text-sm mb-12">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> Dallas, TX</span>
            <span className="flex items-center gap-1.5"><Phone size={14} /> 945-426-8797</span>
            <span className="flex items-center gap-1.5"><Mail size={14} /> harsha.muniraju1981@gmail.com</span>
          </div>

          {/* Inline AI Chatbot — right below the profile */}
          <InlineChatbot />
        </div>
        <a href="#about" className="absolute bottom-6 animate-bounce z-10">
          <ChevronDown size={28} className="text-cyan-400" />
        </a>
      </section>

      {/* About / Executive Summary Section */}
      <section id="about" className="relative py-24 px-6">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&q=80"
            alt="AI and Data"
            className="w-full h-full object-cover opacity-5"
          />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-4 justify-center mb-12">
            <Brain size={32} className="text-cyan-400" />
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Executive Summary
              </span>
            </h2>
          </div>
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
            <p className="text-lg text-gray-300 leading-relaxed">
              Visionary Data & AI executive with 15+ years architecting enterprise-scale data, cloud, and AI capabilities at Fortune 50 scale — including the inception and scale-up of the <strong className="text-cyan-300">400-member global Chief Data Office at AT&T</strong>, processing <strong className="text-cyan-300">760+ petabytes of enterprise data</strong>. Architect of enterprise roadmaps spanning agentic AI, GenAI, LLMs, RAG, MLOps, and multi-cloud with delivery of <strong className="text-cyan-300">$70M+ in savings</strong>, <strong className="text-cyan-300">40% faster delivery</strong>, and <strong className="text-cyan-300">35% cost reduction</strong>. Productionized <strong className="text-cyan-300">20+ GenAI products serving 1,000+ users</strong> and built global engineering organizations with <strong className="text-cyan-300">&gt;90% retention</strong>.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '760+ PB', label: 'Data Managed' },
              { value: '$70M+', label: 'Savings Delivered' },
              { value: '400+', label: 'Global Team Built' },
            ].map((metric, i) => (
              <div key={i} className="text-center p-6 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl hover:border-cyan-500/30 transition-colors">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-500 mt-2">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-24 px-6 bg-black/30">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Corporate buildings"
            className="w-full h-full object-cover opacity-5"
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-4 justify-center mb-12">
            <Building2 size={32} className="text-cyan-400" />
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Professional Experience
              </span>
            </h2>
          </div>
          <p className="text-center text-gray-500 mb-12 text-sm">
            Ask the AI chatbot below for details about responsibilities at each role
          </p>
          <div className="space-y-6">
            {[
              {
                role: 'Associate Director of Technology II — Chief Data Office',
                company: 'AT&T Inc.',
                period: '2018 – Present',
                location: 'Plano, TX',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
              },
              {
                role: 'Project Manager',
                company: 'Mindtree India Pvt Ltd.',
                period: '2015 – 2018',
                location: 'Bengaluru, India',
                image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80',
              },
              {
                role: 'Principal Software Engineer',
                company: 'Tesco Bank, Inc.',
                period: '2009 – 2015',
                location: 'Bengaluru, India',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
              },
              {
                role: 'Software Engineer',
                company: 'SunGard Solutions (now FIS)',
                period: 'Earlier',
                location: 'India',
                image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80',
              },
              {
                role: 'Software Engineer',
                company: 'GE Healthcare India Pvt Ltd',
                period: 'Earlier',
                location: 'India',
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80',
              },
            ].map((exp, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-cyan-500/20">
                <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-cyan-500 border-4 border-gray-950 shadow-lg shadow-cyan-500/30"></div>
                <div className="group bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all">
                  <div className="flex flex-col md:flex-row">
                    <div className="hidden md:block md:w-48 md:h-auto shrink-0 overflow-hidden">
                      <img src={exp.image} alt={exp.company} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                          <p className="text-cyan-400 font-medium">{exp.company}</p>
                        </div>
                        <div className="text-sm text-gray-500 mt-2 md:mt-0 md:text-right">
                          <div className="font-medium text-gray-400">{exp.period}</div>
                          <div className="flex items-center gap-1 md:justify-end mt-1">
                            <MapPin size={12} />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-24 px-6">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&q=80"
            alt="Technology"
            className="w-full h-full object-cover opacity-5"
          />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-4 justify-center mb-12">
            <Cpu size={32} className="text-cyan-400" />
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Core Technical Competencies
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Brain size={22} />,
                title: 'AI / GenAI / LLMs',
                bgImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
                skills: ['Azure OpenAI (GPT-4o, GPT-4 Turbo, o1)', 'Claude 4.7/4.5/Opus/Sonnet', 'Llama 3', 'Mistral', 'Gemini', 'RAG (Azure AI Search)', 'FAISS', 'pgvector', 'Fine-tuning (LoRA, PEFT, RLHF)', 'LangChain', 'LangGraph', 'CrewAI', 'AutoGen'],
              },
              {
                icon: <Code size={22} />,
                title: 'MLOps / LLMOps',
                bgImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
                skills: ['Azure ML', 'MLflow', 'Kubeflow', 'Amazon SageMaker', 'Vertex AI', 'Docker', 'Kubernetes (AKS)', 'Azure DevOps', 'GitHub Actions', 'A/B Testing'],
              },
              {
                icon: <Database size={22} />,
                title: 'Data Platforms',
                bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
                skills: ['Snowflake', 'Azure Databricks', 'Delta Lake', 'Apache Spark', 'Kafka', 'Airflow', 'dbt', 'Microsoft Fabric', 'Apache Iceberg', 'Informatica', 'Teradata', 'Vertica'],
              },
              {
                icon: <TrendingUp size={22} />,
                title: 'Cloud & Infra',
                bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
                skills: ['Azure (OpenAI, AI Search, Cosmos DB, Synapse, AKS)', 'AWS (Bedrock, S3, Glue, Lambda)', 'Terraform', 'Infrastructure-as-Code', 'FinOps'],
              },
              {
                icon: <Shield size={22} />,
                title: 'Responsible AI',
                bgImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&q=80',
                skills: ['EU AI Act', 'NIST AI RMF', 'ISO 42001', 'GDPR', 'CCPA', 'SOC 2', 'Azure AI Content Safety', 'Bias/Fairness Audits', 'Model Cards'],
              },
              {
                icon: <Users size={22} />,
                title: 'Leadership',
                bgImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
                skills: ['P&L Ownership ($200M+)', '400+ Global Team', 'Multi-vendor Strategy', 'M&A Integration', 'Talent Strategy', 'Board-level Communication'],
              },
            ].map((category, i) => (
              <div key={i} className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-colors group">
                <div className="absolute inset-0 z-0">
                  <img src={category.bgImage} alt={category.title} className="w-full h-full object-cover opacity-[0.12] group-hover:opacity-[0.20] transition-opacity" />
                </div>
                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {category.icon}
                    </div>
                    <h3 className="text-base font-semibold text-white">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill, j) => (
                      <span key={j} className="px-2.5 py-1 bg-black/30 border border-white/[0.06] rounded-md text-xs text-gray-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Programming Languages Bar */}
          <div className="mt-8 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <Code size={18} className="text-cyan-400" /> Programming & Tooling
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Python', 'SQL', 'PySpark', 'Scala', 'REST APIs', 'GraphQL', 'Git', 'Azure DevOps', 'JIRA', 'Confluence', 'Power BI'].map((lang, i) => (
                <span key={i} className="px-4 py-2 bg-cyan-500/5 border border-cyan-500/15 rounded-lg text-sm text-cyan-300 font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" className="relative py-24 px-6 bg-black/30">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1920&q=80"
            alt="Education"
            className="w-full h-full object-cover opacity-5"
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-4 justify-center mb-12">
            <GraduationCap size={32} className="text-cyan-400" />
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Education & Certifications
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h3 className="text-lg font-semibold mb-5 text-gray-300 flex items-center gap-2">
                <GraduationCap size={18} className="text-cyan-400" /> Education
              </h3>
              <div className="space-y-4">
                {[
                  {
                    degree: 'MBA, Business Analytics',
                    school: 'Jack Welch Management Institute, Strayer University',
                    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&q=80',
                  },
                  {
                    degree: 'PG Program in AI & Machine Learning',
                    school: 'McCombs School of Business, UT Austin',
                    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&q=80',
                  },
                  {
                    degree: 'B.E., Computer Science',
                    school: 'Visvesvaraya Technological University',
                    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&q=80',
                  },
                ].map((edu, i) => (
                  <div key={i} className="group bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center gap-4 p-4">
                      <img src={edu.image} alt={edu.school} className="w-20 h-20 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-medium text-white text-sm">{edu.degree}</h4>
                        <p className="text-cyan-400/70 text-xs mt-1">{edu.school}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-lg font-semibold mb-5 text-gray-300 flex items-center gap-2">
                <Award size={18} className="text-cyan-400" /> Certifications
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Project Management Professional (PMP)', org: 'Project Management Institute', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80' },
                  { name: 'SAFe Agilist', org: 'Scaled Agile, Inc.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80' },
                ].map((cert, i) => (
                  <div key={i} className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:border-cyan-500/30 transition-colors">
                    <img src={cert.image} alt={cert.org} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    <div>
                      <span className="text-white text-sm font-medium">{cert.name}</span>
                      <p className="text-gray-500 text-xs mt-0.5">{cert.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1920&q=80"
            alt="Contact"
            className="w-full h-full object-cover opacity-5"
          />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-gray-500 mb-10">
            I'm always interested in hearing about new opportunities, collaborations, and AI-driven transformation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:harsha.muniraju1981@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-medium hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20">
              <Mail size={18} />
              Email Me
            </a>
            <a href="https://linkedin.com/in/harshamuniraju" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-cyan-500/30 rounded-full font-medium hover:bg-cyan-500/10 transition-all text-cyan-300">
              <LinkedinIcon size={18} />
              LinkedIn
            </a>
            <a href="tel:+19454268797" className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full font-medium hover:bg-white/5 transition-all text-gray-300">
              <Phone size={18} />
              Call Me
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/[0.05] text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Harsha Muniraju. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default App
