import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers for Vercel serverless
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : '';
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';
  const receiver = (process.env.SMTP_RECEIVER ? process.env.SMTP_RECEIVER.trim() : '') || user;

  if (!user || !pass) {
    return res.status(500).json({
      error: 'SMTP service is not configured yet. Set SMTP_USER and SMTP_PASS environment variables.'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from: `"${name}" <${user}>`,
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
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('[SMTP Serverless Error]:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email via SMTP.' });
  }
}
