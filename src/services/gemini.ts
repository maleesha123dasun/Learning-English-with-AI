import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const getGeminiResponse = async (prompt: string, systemInstruction?: string) => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: systemInstruction || "You are a helpful English teacher named EnglishMaster AI.",
    },
  });

  return response.text;
};

export const correctGrammar = async (text: string) => {
  const prompt = `Please correct the grammar of the following English text. Provide the corrected version and a brief explanation of the changes: "${text}"`;
  const systemInstruction = "You are an expert English grammar corrector. Return your response in JSON format with 'correctedText' and 'explanation' fields.";
  
  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
};

export const suggestVocabulary = async (topic: string) => {
  const prompt = `Suggest 5 advanced vocabulary words related to the topic: "${topic}". For each word, provide a definition and an example sentence.`;
  const systemInstruction = "You are a vocabulary expert. Return your response in JSON format as an array of objects with 'word', 'definition', and 'example' fields.";
  
  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
};

export const translateText = async (text: string, sourceLang: string, targetLang: string) => {
  const prompt = `Translate the following text from ${sourceLang} to ${targetLang}: "${text}". Only provide the translated text.`;
  const systemInstruction = `You are a professional translator. Translate accurately between English and Sinhala.`;
  
  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { systemInstruction },
  });

  return response.text;
};

export const dictionaryLookup = async (word: string) => {
  const prompt = `Provide a comprehensive dictionary entry for the word "${word}" in the style of the Cambridge Dictionary. Include:
  1. Phonetic transcription.
  2. Word class (noun, verb, etc.).
  3. Sinhala meaning.
  4. Multiple definitions/uses.
  5. At least 2 example sentences for each use.
  6. Synonyms and Antonyms.`;
  
  const systemInstruction = "You are an expert lexicographer. Return your response in JSON format with fields: 'word', 'phonetic', 'class', 'sinhalaMeaning', 'entries' (an array of objects with 'definition', 'sinhalaDefinition', 'examples' (array of strings)), 'synonyms' (array), 'antonyms' (array).";
  
  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
};

export const autoFillVocabulary = async (word: string) => {
  const prompt = `Provide detailed information for the English word "${word}" to be added to a personal vocabulary list. Include:
  1. Sinhala meaning.
  2. All common uses.
  3. At least 2 examples for each use.`;
  
  const systemInstruction = "You are a language learning assistant. Return your response in JSON format with fields: 'sinhalaMeaning', 'uses' (an array of objects with 'useType', 'sinhalaUseType', 'examples' (array of strings))).";
  
  const ai = new GoogleGenAI({ apiKey: apiKey! });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
};
