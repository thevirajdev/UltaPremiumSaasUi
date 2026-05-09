import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("CRITICAL: SMTP credentials missing in environment variables!");
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const { to, subject, html } = await req.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      requireTLS: true,
    });

    const mailOptions = {
      from: '"AIVOICE OS" <thevirajdeveloper@gmail.com>',
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
