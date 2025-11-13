import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import resume from "/Kaushal_R.pdf";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  // ✅ Load credentials from .env
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );

      console.log("✅ Email sent:", res);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });

      // Hide message after 6 seconds
      setTimeout(() => setStatus(null), 6000);
    } catch (err) {
      console.error("❌ EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus(null), 6000);
    }
  }

  return (
    <section className="page-section contact">
      <h1>CONTACT</h1>
      <div className="contact-container">
        <div className="contact-box contact-info">
          <h2>Get in Touch</h2>
          <p><strong>📞 Mobile:</strong> <a href="tel:+918739026208">+91 8739026208</a></p>
          <p><strong>📧 Email:</strong> <a href="mailto:kaushalshukla912@gmail.com">kaushalshukla912@gmail.com</a></p>
          <p><strong>💻 GitHub:</strong> <a href="https://github.com/Delltronex" target="_blank" rel="noopener noreferrer">Delltronex</a></p>
          <p><strong>🔗 LinkedIn:</strong> <a href="https://linkedin.com/in/kaushal-delta" target="_blank" rel="noopener noreferrer">kaushalshukla</a></p>
          <p><strong>📄 Resume:</strong> <a href={resume} download>Download Resume</a></p>
        </div>

        <div className="contact-box contact-form-wrapper">
          <h2>Send Me a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="neon-btn" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="success-msg">✅ Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="error-msg">❌ Failed to send message. Try again later.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
