import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const message = formData.get('message') as string;
    const canShareOnInstagramStr = formData.get('canShareOnInstagram') as string;
    const canShareOnInstagram = canShareOnInstagramStr === 'true';

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Prepare email content
    const timestamp = new Date().toLocaleString();
    const sharingStatus = canShareOnInstagram
      ? 'YES - This message can be shared on Instagram with #SaveMahajanas'
      : 'NO - This is for internal use only';

    const emailBody = `
ANONYMOUS SUBMISSION - Save Mahajanas Website

Date & Time: ${timestamp}
Can Share on Instagram: ${sharingStatus}

Message:
${message}

---
This is an anonymous submission through the Save Mahajanas website.
The sender did not provide any personal information.
    `.trim();

    // Collect attachments
    const attachments = [];
    let fileIndex = 0;
    while (true) {
      const file = formData.get(`file_${fileIndex}`) as File;
      if (!file) break;

      const bytes = await file.arrayBuffer();
      attachments.push({
        filename: file.name,
        content: Buffer.from(bytes),
        contentType: file.type,
      });

      fileIndex++;
    }

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'savemahajanas@proton.me',
      subject: `[ANONYMOUS] New Message - Save Mahajanas${canShareOnInstagram ? ' [CAN SHARE]' : ' [PRIVATE]'}`,
      text: emailBody,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
