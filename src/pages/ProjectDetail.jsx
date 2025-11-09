import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🧠 Each project has unique details + links
  const projects = {
    1: {
      title: "Project Alpha – AI/ML",
      tag: "AI/ML",
      description:
        "An advanced AI-driven predictive analytics system that processes healthcare data and forecasts trends using ML algorithms.",
      tech: ["Python", "TensorFlow", "Scikit-learn", "Flask"],
      live: "https://project-alpha-demo.vercel.app",
      code: "https://github.com/Delltronex/PDF_Chatbot_translator.git",
    },
    2: {
      title: "Project Beta – Web",
      tag: "Web Development",
      description:
        "A futuristic Next.js portfolio website inspired by TRON, featuring glowing UI, grid animations, and interactive elements.",
      tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      live: "https://tron-portfolio.vercel.app",
      code: "https://github.com/kaushalshukla/tron-portfolio",
    },
    3: {
      title: "Project Gamma – Blockchain",
      tag: "Blockchain",
      description:
        "A decentralized healthcare record system ensuring secure, immutable, and permissioned data access for patients and doctors.",
      tech: ["Solidity", "React", "Node.js", "Ethereum", "MetaMask"],
      live: "https://blockhealth-demo.netlify.app",
      code: "https://github.com/kaushalshukla/blockhealth",
    },
    4: {
      title: "Project Delta – FinTech",
      tag: "FinTech / AI",
      description:
        "An AI chatbot for financial risk evaluation using LangChain, capable of analyzing portfolios and providing risk scores.",
      tech: ["Python", "LangChain", "OpenAI API", "FastAPI"],
      live: "https://finedge-ai.vercel.app",
      code: "",
    },
  };

  const project = projects[id];

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>⚠️ Project Not Found</h2>
        <button className="pd-back" onClick={() => navigate("/projects")}>
          ← Back to Projects
        </button>
      </div>
    );
  }

  return (
    <section className="project-details">
      <div className="project-box">
        <div className="pd-header">
          <h1 className="pd-title">{project.title}</h1>
          <span className="pd-tag">{project.tag}</span>
        </div>

        <p className="pd-description">{project.description}</p>

        <div className="pd-tech">
          <h2>Key Technologies</h2>
          <ul>
            {project.tech.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="pd-buttons">
          <a
            href={project.live}
            className="pd-btn pd-live"
            target="_blank"
            rel="noreferrer"
          >
            🚀 View Live
          </a>
          <a
            href={project.code}
            className="pd-btn pd-code"
            target="_blank"
            rel="noreferrer"
          >
            💻 Source Code
          </a>
        </div>

        <button className="pd-back" onClick={() => navigate("/projects")}>
          ← Back to Projects
        </button>
      </div>
    </section>
  );
}
