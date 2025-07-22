import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Store contact form submission in database
    const { error } = await supabase.from("contact_submissions").insert([
      {
        name,
        email,
        message,
        submitted_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error("Database error:", error)
      // Continue even if database insert fails
    }

    // Here you could also send an email notification
    // using a service like Resend, SendGrid, or Nodemailer

    return NextResponse.json({
      message: "Message sent successfully! I'll get back to you soon.",
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}
