import React from "react";

export default function Skills() {
  return (
    <section className="page-section">
      <h1>SKILLS</h1>
      <div className="grid">
        <div className="card">
          <h3>Languages</h3>
          <p>Python, JavaScript</p>
        </div>

        <div className="card">
          <h3>Frameworks</h3>
          <p>TensorFlow, LangChain, Flask, Qerw.AI, N8N, HuggingFace</p>
        </div>

        <div className="card">
          <h3>Technologies</h3>
          <p>LLM, RAG, AI/ML, VectorDB, Prompt Engineering</p>
        </div>

        <div className="card">
          <h3>Development Tools</h3>
          <p>VS Code, AWS, Docker, Git, GitHub</p>
        </div>

        <div className="card">
          <h3>Database</h3>
          <p>MySQL, PostgreSQL</p>
        </div>
      </div>
    </section>
  );
}
