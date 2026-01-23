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
Analyze this sales data: ${JSON.stringify(sales)}.

Return short bullet points:
- Total revenue
- Best-selling product (BY QUANTITY SOLD)
- One business tip

Max 4–5 lines. No paragraphs.
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