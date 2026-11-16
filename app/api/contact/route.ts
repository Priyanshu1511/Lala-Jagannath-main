import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, phone, email, message } = await request.json();

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;

    if (!scriptUrl) {
      return NextResponse.json(
        { success: false, error: "Google Sheets URL is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        message,
      }),
      cache: "no-store",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error("Google Sheets submission failed");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error("Google Sheets did not confirm the submission");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to save enquiry" },
      { status: 500 }
    );
  }
}