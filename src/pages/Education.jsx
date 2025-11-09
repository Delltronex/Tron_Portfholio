import React from "react";

export default function Education() {
  return (
    <section className="page-section">
      <h1>EDUCATION</h1>
      <div className="timeline">
        <div className="timeline-item">
          <h2>B.E. in Information Technology</h2>
          <p>University of Mumbai</p>
          <p>7.9 CGPA</p>
          <span>2021 – 2025</span>
        </div>
        <div className="timeline-item">
          <h2>Diploma in Information Technology</h2>
          <p>Government Polytechnic Mumbai</p>
          <p>84.58 %</p>
          <span>2019 – 2021</span>
        </div>
        <div className="timeline-item">
          <h2>SSC</h2>
          <p>Maharashtra Board</p>
          <p>81.20 %</p>
          <span>2017 – 2019</span>
        </div>
      </div>
    </section>
  );
}
