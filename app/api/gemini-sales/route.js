import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { sales } = await req.json();

    // 1. Calculate metrics manually to ensure accuracy (AI can struggle with math/low-quality data)
    const totalRevenue = sales.reduce((acc, item) => acc + ((item.price || 0) * (item.sold || 0)), 0);

    // Find best seller safely
    const bestSeller = sales.length > 0
      ? sales.reduce((max, item) => (item.sold > (max?.sold || 0) ? item : max), sales[0])
      : null;

    // 2. Format the known data
    const summaryData = `
    - Total Revenue: ${totalRevenue}€
    - Best Selling: ${bestSeller ? `${bestSeller.name} (${bestSeller.sold} units)` : 'None'}
    `;

    // 3. Initialize AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // 4. Ask AI ONLY for the qualitative insight, feeding it the hard numbers
    const prompt = `
    You are an expert sales analyst. 
    
    DATA CONTEXT:
    ${summaryData}
    
    RAW SALES DATA:
    ${JSON.stringify(sales)}

    YOUR TASK:
    Generate a concise sales summary in this EXACT format (do not calculate revenue yourself, use the provided value):

    - Total Revenue: ${totalRevenue}€
    - Best-selling product: ${bestSeller ? bestSeller.name : "None"}
    - Strategic Insight: [Provide one high-impact actionable recommendation based on the data. Focus on inventory turnover, pricing opportunities, or stock level warnings. Max 1 sentence.]

    Do not use Markdown headers. Keep it clean and professional.
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