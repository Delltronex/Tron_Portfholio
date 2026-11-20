import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (.env in server/ or fallback to root .env)
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.SERVER_PORT || process.env.PORT || 5001;

// Middlewares
app.use(cors({
  origin: '*', // Allows requests from React frontend (e.g. Vite http://localhost:5173)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));
app.use(express.json());

// Transporter configuration using SMTP
const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : '';
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';

  if (!user || !pass) {
    console.warn('[SMTP Warning] SMTP_USER or SMTP_PASS is missing in environment variables.');
  }

  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: port === 465, // true for port 465 (SSL), false for 587 (TLS/STARTTLS)
    auth: {
      user: user,
      pass: pass
    }
  });
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Node.js SMTP Mail Server',
    smtp_configured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)
  });
});

// Contact mail send endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please provide all required fields: name, email, and message.'
    });
  }

  const receiver = process.env.SMTP_RECEIVER || process.env.SMTP_USER;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(500).json({
      success: false,
      error: 'SMTP service is not configured. Please set SMTP_USER and SMTP_PASS in the .env file.'
    });
  }

  try {
    const transporter = createTransporter();

    // Verify SMTP connection
    await transporter.verify();

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: receiver,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #121214; color: #f5f5f7; border-radius: 16px; border: 1px solid #2a2a2e;">
          <div style="border-bottom: 2px solid #ff6b00; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #ff6b00; font-size: 22px;">Portfolio Contact Form Inquiry</h2>
            <p style="margin: 4px 0 0; color: #8e8e93; font-size: 13px;">Received via Portfolio SMTP Service</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #a1a1a6; font-size: 14px; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1a6; font-size: 14px;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #ff6b00; text-decoration: none; font-size: 15px;">${email}</a></td>
            </tr>
          </table>

          <div style="background: #1c1c1e; padding: 18px; border-radius: 12px; border-left: 4px solid #ff6b00; margin-bottom: 20px;">
            <p style="margin: 0 0 8px; color: #a1a1a6; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;"><strong>Message:</strong></p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #ffffff; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin: 0; font-size: 12px; color: #636366; text-align: center;">
            Sent directly from your React Portfolio contact page.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP Success] Email sent from ${email} (${name}). Message ID: ${info.messageId}`);

    return res.status(200).json({
      success: true,
      message: 'Email delivered successfully via SMTP!',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('[SMTP Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to deliver email through SMTP server.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SMTP Mail Server running on http://localhost:${PORT}`);
  console.log(`📡 Ready to receive contact requests from React at http://localhost:${PORT}/api/contact`);
});
