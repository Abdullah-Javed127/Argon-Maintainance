import Groq from 'groq-sdk';

/**
 * Service to handle Argon Maintenance thinking process using Groq
 */
export const getMaintenanceAdvice = async (machineName, apiKey) => {
  // Prioritize API key from .env file, fallback to passed apiKey (from localStorage)
  const finalApiKey = import.meta.env.VITE_GROQ_API_KEY || apiKey;

  if (!finalApiKey || finalApiKey === 'your_groq_api_key_here') {
    throw new Error('Groq API Key not found. Please set VITE_GROQ_API_KEY in your .env file or settings.');
  }

  const groq = new Groq({ apiKey: finalApiKey, dangerouslyAllowBrowser: true });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are Argon's Maintenance Expert. Your task is to provide concise, clean, and helpful maintenance interval advice for various machines. 
          Respond in a structured format:
          1. Maintenance Interval: (e.g., Every 6 months, Every 5000km)
          2. Required Actions: (Bulleted list of 2-3 key actions)
          3. Rationale: (One sentence explaining why this is needed)
          
          Tone: Professional, helpful, and direct. 
          If the input is not a machine or object that needs maintenance, politely explain that you can only help with physical equipment.`
        },
        {
          role: 'user',
          content: `Machine/Object: ${machineName}`
        }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.5,
      max_tokens: 200,
    });

    return chatCompletion.choices[0]?.message?.content || 'No advice received.';
  } catch (err) {
    console.error('Groq API Error:', err);

    // Friendly error handler
    if (err.status === 401) {
      throw new Error("The API key seems incorrect. Please double-check it in the settings.");
    } else if (err.status === 429) {
      throw new Error("We've hit the maximum capacity for now. Please wait a moment before trying again.");
    } else if (err.status === 404) {
      throw new Error("It seems like that part of the system is temporarily unavailable.");
    } else {
      throw new Error("Something went wrong with the thinking process. Please try again.");
    }
  }
};
