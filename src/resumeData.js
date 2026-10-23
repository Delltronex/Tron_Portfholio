export const resumeData = {
  name: "Kaushal Shukla",
  title: "Generative AI & Full-Stack Developer",
  headline: "Information Technology Graduate & Developer Intern specializing in Agentic AI, LLM Orchestration, RAG & Full-Stack Systems",
  phone: "+91 8739026208",
  email: "kaushalshukla912@gmail.com",
  linkedin: "https://linkedin.com/in/kaush-shuk",
  linkedinUsername: "kaush-shuk",
  github: "https://github.com/Delltronex",
  githubUsername: "Delltronex",
  location: "Nallasopara, Maharashtra, India",
  experienceYears: "1+ Years Experience",
  about: `Information Technology graduate and Developer Intern experienced in integrating Generative AI and LLMs into production-grade web applications. Skilled in Python, FastAPI, RAG, Agentic AI, intelligent chatbots, multi-model orchestration, and enterprise AI automation. Proven track record in optimizing vector stores, reducing system-prompt token costs by ~60%, and developing responsive client applications.`,

  stats: [
    { value: "1+", label: "Years AI & Web Dev", color: "blue" },
    { value: "10+", label: "Client & Govt Websites", color: "red" },
    { value: "~60%", label: "Token Cost Optimization", color: "yellow" },
    { value: "10+", label: "Integrated LLM Ecosystems", color: "green" }
  ],

  technicalSkills: {
    languages: ["Python", "JavaScript (ES6+)", "SQL"],
    frameworks: ["FastAPI", "React.js", "Next.js", "Node.js", "LangChain", "LangGraph", "Google ADK", "Flask", "TensorFlow"],
    ai_ml: [
      "Large Language Models (LLMs)",
      "Generative AI",
      "Retrieval-Augmented Generation (RAG)",
      "Vector Databases (FAISS, Supabase Vector)",
      "Transformers",
      "Multi-Agent Systems",
      "Prompt Engineering",
      "Safety Guardrails & Hallucination Mitigation"
    ],
    tools: ["Docker", "AWS Cloud", "Vercel", "Render", "Git & GitHub", "Ollama", "Sarvam AI (TTS)"],
    databases: ["PostgreSQL", "MySQL", "Supabase"]
  },

  experience: [
    {
      id: "netlynx",
      role: "Developer Intern",
      company: "Netlynx Solutions Pvt. Ltd.",
      location: "Mumbai, India",
      period: "March 2026 – Present",
      bullets: [
        "Architected 'Darshita', an advanced AI-powered emotional chatbot built with Node.js, React, and Next.js, incorporating emotion analysis, multi-model orchestration, dynamic routing across GPT, Gemini, and Claude APIs, and automatic fallback failover mechanisms.",
        "Optimized Supabase and PostgreSQL database integrations and structured system prompts, reducing token consumption by approximately 60% while elevating response quality and consistency.",
        "Engineered robust safety guardrails, anti-hallucination verification layers, real-time web search tool calling, and integrated Sarvam AI text-to-speech for lifelike vocal delivery.",
        "Contributed to the full-cycle development and deployment of 10+ client websites for private-sector companies and government projects."
      ],
      skills: ["Next.js", "React", "Node.js", "Gemini API", "Claude API", "PostgreSQL", "Supabase", "Sarvam AI TTS", "AI Guardrails"]
    },
    {
      id: "reknot",
      role: "Web Application Development Intern",
      company: "Reknot Solutions Pvt. Ltd.",
      location: "Thane, India (Remote)",
      period: "March 2022 – June 2022",
      bullets: [
        "Developed an interactive Influencer Portal using React.js, Node.js, and SQL, successfully connecting 100+ influencers with commercial brands for campaign collaborations.",
        "Assisted with production application deployment, server hosting configuration, and collaborated with cross-functional developer teams utilizing Git and GitHub."
      ],
      skills: ["React.js", "Node.js", "SQL", "Git", "GitHub", "Web Hosting"]
    }
  ],

  projects: [
    {
      id: "coding-assistant",
      title: "AI-Powered Multi-Model Chatbot & AI Coding Assistant",
      tagline: "Multi-Model Orchestration & Ollama Local Inference",
      category: "Multi-LLM & Dev Tools",
      description: "Developed a comprehensive multi-model AI chatbot supporting both multiple cloud API providers (Google Gemini, OpenAI, Anthropic Claude) and locally hosted open-source LLMs through Ollama. Implemented live web search tool calling and a secure file-management subsystem that allows users to create, inspect, edit, and modify code files dynamically across multiple programming languages.",
      techStack: ["Python", "FastAPI", "React", "Ollama", "Multi-LLM APIs", "Web Search Tools"],
      highlights: [
        "Dynamic provider routing between cloud LLMs & offline local Ollama models",
        "Autonomous code file creation, syntax parsing, and live editing",
        "Real-time web browsing integration for code documentation lookups"
      ]
    },
    {
      id: "review-management",
      title: "AI Customer Review & Feedback Management System",
      tagline: "Autonomous Agentic Sentiment & Response Automation",
      category: "Agentic AI & Analytics",
      description: "Developed an autonomous agentic AI system engineered to ingest and analyze multi-channel customer reviews, assess sentiment nuances, and automatically synthesize personalized, context-aware responses. Built an interactive owner dashboard to inspect customer feedback trends, manage AI-generated responses, and extract actionable business insights to resolve recurring customer issues.",
      techStack: ["Python", "FastAPI", "React", "Supabase", "LLMs", "Vector Analysis"],
      highlights: [
        "Autonomous sentiment classification and personalized brand response generation",
        "Interactive analytics dashboard for business owners to track satisfaction metrics",
        "Supabase integration for secure storage and review lifecycle tracking"
      ]
    },
    {
      id: "documents-chat",
      title: "Documents Chat Web App (RAG Architecture)",
      tagline: "Retrieval-Augmented Generation & Multilingual Translation",
      category: "RAG & Multilingual AI",
      description: "Built a production RAG (Retrieval-Augmented Generation) document chatbot utilizing LLaMA-2 and FAISS vector indexing to answer questions over complex PDF documents with source attribution. Integrated Google Translator API for seamless multilingual translation and cross-lingual querying of document content.",
      techStack: ["Python", "LangChain", "FAISS", "Streamlit", "LLaMA-2", "Google Translator API"],
      highlights: [
        "Dense vector embedding storage and sub-second semantic retrieval using FAISS",
        "Context-grounded hallucination-free Q&A over lengthy multi-page PDFs",
        "Integrated Google Translator API for real-time multilingual document parsing"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Engineering (B.E.) in Information Technology",
      institution: "Universal College of Engineering",
      location: "Mumbai, Maharashtra",
      score: "CGPI: 7.90",
      period: "Nov 2022 – Jun 2025"
    },
    {
      degree: "Diploma in Information Technology",
      institution: "Government Polytechnic Mumbai",
      location: "Mumbai, Maharashtra",
      score: "84.58%",
      period: "Aug 2019 – Jul 2022"
    }
  ],

  certifications: [
    {
      name: "AWS Academy Graduate",
      issuer: "Amazon Web Services (AWS)",
      icon: "cloud",
      description: "Cloud computing architecture, IAM security, compute, storage, and AWS infrastructure."
    },
    {
      name: "AI Agent Fundamentals",
      issuer: "Hugging Face",
      icon: "smart_toy",
      description: "Autonomous agent architectures, tool calling, re-act loop reasoning, and multi-agent systems."
    }
  ]
};
