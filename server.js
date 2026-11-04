import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.SERVER_PORT || 5001;

app.use(cors());
app.use(express.json());

// Transporter configuration using SMTP environment variables
const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : '';
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';

  if (!host || !user || !pass) {
    console.warn('[SMTP Warning] SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) are not fully configured in .env');
  }

  return nodemailer.createTransport({
    host: host || 'smtp.gmail.com',
    port: port,
    secure: port === 465, // true for 465, false for other ports (587)
    auth: {
      user: user,
      pass: pass
    }
  });
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SMTP Mailer Service' });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const receiver = process.env.SMTP_RECEIVER || process.env.SMTP_USER;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(500).json({
      error: 'SMTP service is not configured yet. Please provide SMTP details in .env'
    });
  }

  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Recommended by SMTP providers to send from authenticated user
      replyTo: email,
      to: receiver,
      subject: `New Portfolio Inquiry from ${name}`,
      text: `You received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; background-color: #121212; color: #f5f5f5; border-radius: 12px; border: 1px solid #2a2a2a;">
          <h2 style="color: #ffaa40; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 12px;">New Portfolio Contact Message</h2>
          <p style="font-size: 15px; margin: 12px 0;"><strong>Sender Name:</strong> ${name}</p>
          <p style="font-size: 15px; margin: 12px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #60a5fa;">${email}</a></p>
          <div style="margin-top: 20px; padding: 16px; background-color: #1e1e1e; border-radius: 8px; border-left: 4px solid #ffaa40;">
            <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #888;">Sent from your Portfolio contact form.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[SMTP Success] Email sent:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!'
    });
  } catch (error) {
    console.error('[SMTP Error]:', error);
    return res.status(500).json({
      error: error.message || 'Failed to send email via SMTP.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`SMTP Mail Server running at http://localhost:${PORT}`);
});
