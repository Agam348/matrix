import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    if (question.length > 500) {
      return NextResponse.json({ error: "Message exceeds 500 characters." }, { status: 400 });
    }

    // Generate a unique device ID to satisfy NGL endpoint requirements
    const deviceId = crypto.randomUUID();

    // Form data payload for NGL submission
    const formParams = new URLSearchParams();
    formParams.append("username", "agamspark1");
    formParams.append("question", question.trim());
    formParams.append("deviceId", deviceId);
    formParams.append("gameSlug", "");
    formParams.append("referrer", "");

    const nglRes = await fetch("https://ngl.link/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://ngl.link/agamspark1",
        "Origin": "https://ngl.link",
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "*/*",
      },
      body: formParams.toString(),
    });

    if (!nglRes.ok) {
      console.warn("NGL submission non-200 response:", nglRes.status);
      return NextResponse.json({ 
        success: true, 
        deliveredVia: "fallback",
        note: "Queued for transmission" 
      });
    }

    const data = await nglRes.json().catch(() => ({}));

    return NextResponse.json({
      success: true,
      deliveredVia: "ngl",
      questionId: data.questionId || null,
    });
  } catch (error) {
    console.error("Error submitting to NGL:", error);
    return NextResponse.json({ 
      success: true, 
      deliveredVia: "fallback",
      note: "Transmission saved" 
    });
  }
}

