import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import { useEffect } from "react";

function App() {
  // background motion effect
  useEffect(() => {
    const handleMove = (e) => {
      document.body.style.backgroundPosition = `${e.pageX / 100}px ${e.pageY / 100}px`;
    };
    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/education" element={<Education />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}

export default App;
