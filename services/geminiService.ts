import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini Client lazily to prevent crash on load if API key is missing
let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

// System instruction to give the AI a persona
const SYSTEM_INSTRUCTION = `
You are an AI assistant for Tibin Jacob's GTM Automation Engineering Portfolio.
Tibin is a GTM Automation Engineer specializing in outbound systems, CRM architecture, lead enrichment, and Revenue Ops.
Key skills: Clay, n8n, HubSpot, Apollo, Claude, OpenAI GPT, Make, Zapier.
Philosophy: "Cut manual sales operations and build scalable, AI-driven outbound pipelines."

Your goal is to answer visitor questions about Tibin's work, availability, and skills.
Keep answers concise, professional, yet witty and technical.
If asked about contact, direct them to the contact form or email tibin.jacob.uiux@gmail.com.
If asked to generate code, politely decline and say you are just a portfolio guide, but Tibin is great at building automations!
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  try {
    const client = getAIClient();
    chatSession = client.chats.create({
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