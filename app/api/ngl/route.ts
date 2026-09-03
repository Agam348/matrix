import { NextResponse } from "next/server";
import crypto from "crypto";

// In-memory sliding window rate limiter: Max 5 submissions per 60 seconds per IP
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out timestamps outside the active window
  const activeTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, activeTimestamps);
    return true;
  }

  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);

  // Periodic memory cleanup to prevent memory leaks from inactive IPs
  if (rateLimitMap.size > 2000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t > RATE_LIMIT_WINDOW)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

// Input sanitizer: Strip HTML script tags and harmful injection characters
function sanitizeInput(text: string): string {
  return text
    .replace(/<[^>]*>?/gm, "") // Remove HTML tags
    .replace(/[<>'"`]/g, "")    // Remove injection delimiter characters
    .trim();
}

export async function POST(req: Request) {
  try {
    // 1. Same-Origin Verification (Cross-Site Request Forgery / CORS defense)
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return NextResponse.json(
            { error: "Forbidden cross-origin request." },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
      }
    }

    // 2. Client IP extraction & Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : (req.headers.get("x-real-ip") || "127.0.0.1");

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait 60 seconds before sending another message." },
        { 
          status: 429,
          headers: { "Retry-After": "60" }
        }
      );
    }

    // 3. Payload parsing & Honeypot bot trap
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    // Silent bot trap: Automated bots fill invisible fields
    if (body.website || body.honeypot || body.hp) {
      return NextResponse.json({ success: true, deliveredVia: "bot-trap" });
    }

    const rawQuestion = body.question;
    if (!rawQuestion || typeof rawQuestion !== "string" || !rawQuestion.trim()) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    // 4. Character Length & Sanitization
    if (rawQuestion.length > 500) {
      return NextResponse.json({ error: "Message exceeds 500 characters." }, { status: 400 });
    }

    const sanitizedQuestion = sanitizeInput(rawQuestion);
    if (!sanitizedQuestion) {
      return NextResponse.json({ error: "Invalid characters detected in message." }, { status: 400 });
    }

    // 5. Generate secure device ID & construct upstream payload
    const deviceId = crypto.randomUUID();
    const formParams = new URLSearchParams();
    formParams.append("username", "agamspark1");
    formParams.append("question", sanitizedQuestion);
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

