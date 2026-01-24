import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, projectType } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Update this with your verified domain
      to: process.env.CONTACT_EMAIL || "chris.r.stjean@gmail.com",
      replyTo: email,
      subject: `New Contact: ${name}${projectType ? ` - ${projectType}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff4d00; border-bottom: 2px solid #ff4d00; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 5px 0; color: #666;"><strong>Name:</strong></p>
            <p style="margin: 5px 0;">${name}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="margin: 5px 0; color: #666;"><strong>Email:</strong></p>
            <p style="margin: 5px 0;"><a href="mailto:${email}">${email}</a></p>
          </div>
          
          ${projectType ? `
          <div style="margin: 20px 0;">
            <p style="margin: 5px 0; color: #666;"><strong>Project Type:</strong></p>
            <p style="margin: 5px 0;">${projectType}</p>
          </div>
          ` : ""}
          
          <div style="margin: 20px 0;">
            <p style="margin: 5px 0; color: #666;"><strong>Message:</strong></p>
            <p style="margin: 5px 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #999; font-size: 12px;">
            Sent from your portfolio contact form
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

