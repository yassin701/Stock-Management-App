import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { sales } = await req.json();

    // 1. Initialize with your secure key
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // 2. Use the "latest" alias to avoid version-specific 404s
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
  You are a concise business analyst. 
  Analyze this sales data: ${JSON.stringify(sales)}

  Provide a VERY SHORT summary (max 4-5 sentences). 
  Include ONLY:
  - Total Revenue
  - Best selling product
  - One key business tip.
  
  Use simple bullet points. No long paragraphs.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("DEBUG AI ERROR:", error);
    return NextResponse.json(
      { text: "AI Analysis currently unavailable. Please try again." },
      { status: 500 }
    );
  }
}