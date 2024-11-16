import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiKey } from "../constants/temp";

async function getAI(prompt: string, text: string): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(geminiKey);

    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("PROMPT + TEXT", prompt + text);
    const response = await model.generateContent(prompt + text);
    console.log(response);
    const generatedText = response?.response.text() || "No text generated.";

    console.log("Generated text:", generatedText);
    return generatedText.toString();
  } catch (error) {
    console.log("Error generating text:", error);
    return "Error generating text.";
  }
}

export default getAI;
