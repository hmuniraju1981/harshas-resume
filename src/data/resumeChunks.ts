export interface ResumeChunk {
  id: string;
  category: string;
  content: string;
  keywords: string[];
}

export const resumeChunks: ResumeChunk[] = [
  // Identity & Contact
  {
    id: "identity-1",
    category: "identity",
    content:
      "Harsha Muniraju, MBA. Chief Data Office – Data & AI Engineering. Based in Dallas, TX 75407. Phone: 945-426-8797. Email: harsha.muniraju1981@gmail.com. LinkedIn: linkedin.com/in/harshamuniraju. U.S. Work Authorized.",
    keywords: ["name", "contact", "location", "email", "phone", "linkedin", "who", "harsha"],
  },

  // Executive Summary
  {
    id: "summary-1",
    category: "summary",
    content:
      "Harsha is a Visionary Data & AI executive with 15+ years architecting enterprise-scale data, cloud, and AI capabilities at Fortune 50 scale — including the inception and scale-up of the 400-member global Chief Data Office at AT&T, processing 760+ petabytes of enterprise data. Trusted advisor to C-suite and Board on AI strategy, Responsible AI governance, and value creation.",
    keywords: ["summary", "overview", "about", "experience", "years", "executive", "background"],
  },
  {
    id: "summary-2",
    category: "summary",
    content:
      "Harsha is the architect of enterprise roadmaps spanning agentic AI, GenAI, LLMs, RAG (Azure AI Search), MLOps, and multi-cloud (Azure-primary, AWS, GCP) with delivery of $70M+ in savings, 40% faster delivery, and 35% cost reduction. Operationalized Responsible AI programs aligned to the EU AI Act, NIST AI RMF, and ISO 42001, productionized 20+ GenAI products serving 1,000+ users, and built global engineering organizations with >90% retention.",
    keywords: ["summary", "achievements", "savings", "genai", "responsible ai", "accomplishments"],
  },

  // Core Technical Competencies
  {
    id: "skills-ai",
    category: "skills",
    content:
      "AI / GenAI / LLMs: Azure OpenAI (GPT 5.4, GPT-4.5, GPT-4o, GPT-4 Turbo, o1), Claude 4.7/4.5/Opus/Sonnet, Llama 3, Mistral, Gemini; RAG architectures on Azure AI Search (primary vector DB at AT&T) and Azure Cosmos DB vector store; FAISS, pgvector; fine-tuning (LoRA, PEFT, RLHF); prompt engineering; agentic frameworks (LangChain, LangGraph, CrewAI, AutoGen, Microsoft Agent Framework, Ambiente Agentic AI); model evaluation, Azure AI Content Safety, guardrails, hallucination detection.",
    keywords: ["ai", "genai", "llm", "gpt", "claude", "rag", "langchain", "skills", "technical", "machine learning"],
  },
  {
    id: "skills-mlops",
    category: "skills",
    content:
      "MLOps / LLMOps: Azure ML, MLflow, Kubeflow, Amazon SageMaker, Google Vertex AI, Docker, Kubernetes (AKS), CI/CD (Azure DevOps, GitHub Actions), model monitoring, drift detection, shadow deployments, A/B testing.",
    keywords: ["mlops", "llmops", "deployment", "kubernetes", "docker", "cicd", "skills", "technical"],
  },
  {
    id: "skills-data",
    category: "skills",
    content:
      "Data Platforms & Engineering: Snowflake, Azure Databricks (AT&T Lakehouse), Delta Lake, Apache Spark, PySpark, Kafka, Airflow, dbt, Microsoft Fabric, Apache Iceberg, Informatica; Teradata, Vertica, Oracle, PostgreSQL.",
    keywords: ["data", "engineering", "spark", "kafka", "databricks", "snowflake", "database", "skills", "technical"],
  },
  {
    id: "skills-cloud",
    category: "skills",
    content:
      "Cloud & Infrastructure: Azure (Azure OpenAI, Azure AI Search, Azure Cosmos DB, Databricks, Synapse, Data Factory, ADLS Gen2, AKS, Power BI), AWS (Bedrock, S3, Glue, Lambda), Terraform, Infrastructure-as-Code, FinOps.",
    keywords: ["cloud", "azure", "aws", "infrastructure", "terraform", "skills", "technical"],
  },
  {
    id: "skills-governance",
    category: "skills",
    content:
      "Responsible AI & Governance: EU AI Act, NIST AI RMF, ISO 42001, GDPR, CCPA, SOC 2; Azure AI Content Safety, model risk management, bias/fairness audits, model cards, AI risk registers, human-in-the-loop validation.",
    keywords: ["responsible ai", "governance", "compliance", "gdpr", "ethics", "skills"],
  },
  {
    id: "skills-programming",
    category: "skills",
    content:
      "Programming & Tooling: Python, SQL, PySpark, Scala, REST/GraphQL APIs, Git, Azure DevOps, JIRA, Confluence, Power BI.",
    keywords: ["programming", "python", "sql", "scala", "tools", "skills", "technical", "languages"],
  },
  {
    id: "skills-leadership",
    category: "skills",
    content:
      "Leadership capabilities: P&L ownership, 400+ global team management, multi-vendor strategy, M&A integration, talent strategy.",
    keywords: ["leadership", "management", "team", "p&l", "strategy", "skills"],
  },

  // AT&T Experience
  {
    id: "att-overview",
    category: "experience",
    content:
      "AT&T Inc., Plano, TX | 2018 – Present. Role: Associate Director of Technology II — Chief Data Office. Harsha was the First Employee offshore and scaled the Chief Data Office from inception to a 400-member global organization across the U.S. and India, spanning 8 business units (Mobility, Business, Network, Consumer, WarnerMedia, Latin America, HR/Finance, Cybersecurity).",
    keywords: ["att", "at&t", "experience", "current", "work", "job", "role", "chief data office"],
  },
  {
    id: "att-strategy",
    category: "experience",
    content:
      "AT&T Strategic Leadership: Owned an annual Data & AI investment portfolio of ~$200M, prioritizing initiatives across 8 business units with documented ROI tracking and quarterly Board updates; delivered $70M+ in cumulative organizational savings. Delivered quarterly AI strategy briefings to the Senior Leadership Team. Defined and executed an Azure-primary multi-cloud strategy (Azure OpenAI, Azure Databricks, Azure AI Search, Azure Cosmos DB, ADLS Gen2), improving reliability, reducing compute/storage costs by 22%, and increasing development velocity by 40%.",
    keywords: ["att", "strategy", "leadership", "savings", "cloud", "azure", "portfolio"],
  },
  {
    id: "att-vendor",
    category: "experience",
    content:
      "AT&T Vendor & Platform Strategy: Set vendor and platform strategy across Microsoft (Azure OpenAI, Azure AI Search, Azure Databricks), OpenAI, and Anthropic, negotiating enterprise agreements that reduced GenAI inference costs by 35%.",
    keywords: ["att", "vendor", "platform", "microsoft", "openai", "anthropic", "negotiation"],
  },
  {
    id: "att-ai-innovation",
    category: "experience",
    content:
      "AT&T AI Innovation: Conceived and led the 'AI First CDO' initiative, creating reusable LLM prompt archetypes (Analyst, Engineer, Manager) adopted across 20+ products and 1,000+ internal users, lifting productivity by 25%. Built SAM (Scrum Automation Master) — an agentic AI integration of Microsoft Teams + JIRA + LangChain that automates twice-daily backlog analysis and risk alerts, saving Scrum Masters ~8 hours weekly and improving sprint predictability by 22%.",
    keywords: ["att", "ai", "innovation", "sam", "agentic", "llm", "automation", "langchain"],
  },
  {
    id: "att-rag",
    category: "experience",
    content:
      "AT&T RAG & MLOps: Designed and productionized enterprise RAG architectures over 50+ TB of internal content using Azure AI Search (primary vector store) and Azure Cosmos DB vector embeddings, with retrieval evaluation harnesses lifting answer accuracy by 38% over baseline LLMs and powering Summarize AI, Fraud Detection AI, and customer-facing AI chatbots. Built an internal MLOps/LLMOps platform on Azure ML + Azure Databricks + AKS + MLflow, supporting 250+ production models with automated drift detection, shadow deployments, and rollback — reducing incident MTTR by 55%.",
    keywords: ["att", "rag", "mlops", "vector", "chatbot", "fraud detection", "models"],
  },
  {
    id: "att-safety",
    category: "experience",
    content:
      "AT&T AI Safety: Implemented Azure AI Content Safety, LLM guardrails, hallucination detection, and human-in-the-loop validation across customer-facing GenAI products, reducing unsafe outputs by 85% and accelerating Responsible AI sign-off. Adopted LangChain, LangGraph, CrewAI, Microsoft Agent Framework, and Ambiente Agentic AI for multi-agent workflows, improving automation throughput by 30% and shortening pilot-to-production cycles by 20%.",
    keywords: ["att", "safety", "guardrails", "hallucination", "agentic", "responsible ai"],
  },
  {
    id: "att-data-migration",
    category: "experience",
    content:
      "AT&T Data Platform: Engineered and operated the data platform managing 760+ petabytes of enterprise data across batch, streaming, and analytics workloads — among the largest data estates in the U.S. telecom industry. Directed the migration and stabilization of 300,000 Teradata tables in four months, achieving a <0.01% error rate with zero customer-facing disruption. Migrated 100,000+ Vertica tables with enhanced encryption and performance tuning, reducing query times by 18%. Modernized the data platform to a Microsoft Azure Databricks + Delta Lake lakehouse, migrating 200+ PB of data.",
    keywords: ["att", "data", "migration", "teradata", "vertica", "databricks", "petabytes", "lakehouse"],
  },
  {
    id: "att-streaming",
    category: "experience",
    content:
      "AT&T Real-time & Observability: Built real-time streaming pipelines on Kafka and Spark Structured Streaming, reducing batch latency from 6 hours to under 5 minutes and enabling sub-second fraud detection. Operationalized data observability, data contracts, and lineage tracking (Monte Carlo / Collibra), reducing data-quality incidents by 60% and improving downstream BI trust scores.",
    keywords: ["att", "streaming", "kafka", "real-time", "observability", "fraud", "data quality"],
  },
  {
    id: "att-compliance",
    category: "experience",
    content:
      "AT&T Responsible AI & Compliance: Led enterprise readiness for the EU AI Act, NIST AI RMF, ISO 42001, GDPR, and CCPA; instituted model cards, datasheets, and AI risk registers across 20+ products. Embedded bias, fairness, privacy, and security reviews into the AI SDLC, achieving 100% compliance with internal AI policy and zero regulatory findings. Chaired the enterprise AI Ethics & Risk Review Board.",
    keywords: ["att", "compliance", "responsible ai", "eu ai act", "nist", "ethics", "gdpr"],
  },
  {
    id: "att-talent",
    category: "experience",
    content:
      "AT&T Talent & Org Development: Built and managed global teams of 400+, including data engineers, ML engineers, AI engineers, cloud architects, and people leaders across the U.S. and India; achieved >90% retention. Designed long-term talent strategies that increased technical upskilling participation by 50% and improved internal promotion rates by 20%; created an internal GenAI literacy program that trained 1,000+ employees. Hired and mentored 12 Senior Technical Managers and 25 Manager Research and Technology Management, with 18 internal promotions.",
    keywords: ["att", "talent", "team", "hiring", "mentoring", "retention", "training"],
  },
  {
    id: "att-thought-leadership",
    category: "experience",
    content:
      "AT&T Innovation & Thought Leadership: Launched strategic AI proofs-of-concept annually, with 40% progressing to production. Speaker/panelist at Data & Analytics Summit, and Data + AI Summit (2024–2025); authored 10+ internal whitepapers on agentic AI, Responsible AI, and enterprise GenAI adoption. Active member of the CDO Club; mentor in AT&T's AI Center of Excellence with 25+ mentees advanced to leadership roles.",
    keywords: ["att", "innovation", "speaker", "thought leadership", "publications", "mentoring"],
  },

  // Mindtree Experience
  {
    id: "mindtree-overview",
    category: "experience",
    content:
      "Mindtree India Pvt Ltd., Bengaluru, INDIA | 2015 – 2018. Role: Project Manager. Grew account revenue 350%, from $2M to $9M within 12 months through strategic delivery excellence and deepening client partnerships. Increased operational margins by 10% within one year. Delivered 100% SLA compliance for 12+ months with zero escalations, achieving the highest client satisfaction scores for 17 consecutive months. Managed large-scale support operations for 30+ global brands with a team of 100+ professionals.",
    keywords: ["mindtree", "experience", "project manager", "revenue", "sla", "brands"],
  },

  // Tesco Bank Experience
  {
    id: "tesco-overview",
    category: "experience",
    content:
      "Tesco Bank, Inc., Bengaluru, INDIA | 2009 – 2015. Role: Principal Software Engineer. Led ETL modernization and migration of legacy RBS systems to Fiserv Signature, directly enabling a 107% increase in deposits and a 95% rise in customer lending. Delivered digital banking features that helped drive 90% of customer transactions to digital channels. Architected scalable solutions to support BACS payments for more than 6 million customer accounts.",
    keywords: ["tesco", "bank", "experience", "engineer", "etl", "banking", "digital"],
  },

  // Earlier Experience
  {
    id: "earlier-experience",
    category: "experience",
    content:
      "Earlier Experience: SunGard Solutions India Pvt Ltd — Led the design and delivery of an AI-enabled insurance claims automation platform for Delta Dental and 10+ U.S. insurers, reducing manual entry by 80% and cutting processing time by 50%. GE Healthcare India Pvt Ltd — Contributed to advanced medical imaging solutions with high-performance software modules and 100% on-time delivery; managed end-to-end PACS deployments across 20+ Linux and Windows servers.",
    keywords: ["sungard", "ge healthcare", "earlier", "insurance", "healthcare", "experience"],
  },

  // Education
  {
    id: "education-1",
    category: "education",
    content:
      "Education: MBA, Business Analytics — Jack Welch Management Institute, Strayer University. Post-Graduate Program in Artificial Intelligence & Machine Learning — McCombs School of Business, University of Texas at Austin. Bachelor of Engineering, Computer Science — Visvesvaraya Technological University.",
    keywords: ["education", "mba", "degree", "university", "ai", "ml", "bachelor", "master"],
  },

  // Certifications
  {
    id: "certifications-1",
    category: "certifications",
    content:
      "Certifications: Project Management Professional (PMP) — Project Management Institute. SAFe Agilist — Scaled Agile, Inc.",
    keywords: ["certifications", "pmp", "safe", "agile", "credentials"],
  },
];
