import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeMedicineImage(imagePath) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `You are a pharmaceutical auditor. Analyze this medicine box image. 
    Check for standard formatting, QR codes, and alignment. 
    Return a strict JSON response: {"isAuthentic": true/false, "reason": "brief explanation"}`;
    
    const imageParts = [
        {
            inlineData: {
                data: Buffer.from(fs.readFileSync(imagePath)).toString("base64"),
                mimeType: "image/jpeg"
            }
        }
    ];

    try {
        const result = await model.generateContent([prompt, ...imageParts]);
        const responseText = result.response.text();
        
        // Clean up markdown formatting if Gemini returns it
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "");
        return JSON.parse(cleanJson);
    } catch (error) {
        console.error("AI Analysis Failed:", error);
        return { isAuthentic: false, reason: "Analysis error" };
    }
}
