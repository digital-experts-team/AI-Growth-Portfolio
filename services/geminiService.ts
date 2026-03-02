import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini Client
// In a real scenario, ensure process.env.API_KEY is defined.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

// System instruction to give the AI a persona
const SYSTEM_INSTRUCTION = `
You are "Lumi", an AI assistant for Alex Rivera's UI/UX Design Portfolio.
Alex is a Senior Product Designer based in San Francisco with 8 years of experience.
Key skills: React, Figma, Motion Design, Design Systems, and Prototyping.
Design Philosophy: "Functionality should never sacrifice beauty. Great design is invisible."

Your goal is to answer visitor questions about Alex's work, availability, and skills.
Keep answers concise, professional, yet witty and creative.
If asked about contact, direct them to the contact form or email alex@example.com.
If asked to generate code, politely decline and say you are just a portfolio guide, but Alex is great at coding!
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  try {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  } catch (error) {
    console.error("Failed to initialize chat:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
     return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "I'm speechless!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I seem to be offline momentarily. Please check your connection.";
  }
};