import { GoogleGenAI } from "@google/genai";

// Use import.meta.env for Vite projects
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const getGeminiResponse = async (prompt: string, systemInstruction?: string) => {
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set in Netlify");
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    // Fixed the typo here: only one "model:"
    model: "gemini-1.5-flash", 
    contents: prompt,
    config: {
      systemInstruction: systemInstruction || "You are a helpful English teacher.",
    },
  });

  return response.text;
};

export const correctGrammar = async (text: string) => {
  const prompt = `Please correct the grammar: "${text}"`;
  const systemInstruction = "You are an expert English grammar corrector.";
  
  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
    config: { systemInstruction },
  });

  return response.text;
};

export const suggestVocabulary = async (topic: string) => {
  const prompt = `Suggest 5 advanced vocabulary words for: "${topic}".`;
  const systemInstruction = "You are a vocabulary expert.";
  
  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
    config: { systemInstruction },
  });

  return response.text;
};

export const translateText = async (text: string, sourceLang: string, targetLang: string) => {
  const prompt = `Translate from ${sourceLang} to ${targetLang}: "${text}".`;
  const systemInstruction = `You are a professional translator.`;
  
  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
    config: { systemInstruction },
  });

  return response.text;
};

export const dictionaryLookup = async (word: string) => {
  const prompt = `Provide a dictionary entry for "${word}".`;
  const systemInstruction = "You are an expert lexicographer.";
  
  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
    config: { systemInstruction },
  });

  return response.text;
};

export const autoFillVocabulary = async (word: string) => {
  const prompt = `Provide detailed information for the word "${word}".`;
  const systemInstruction = "You are a language learning assistant.";
  
  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
    config: { systemInstruction },
  });

  return response.text;
};
