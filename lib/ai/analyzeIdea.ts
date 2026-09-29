import 'server-only';
import { GoogleGenAI } from '@google/genai';
import { providerSchema } from './providerSchema';
import { analysisSchema } from './schema';
import { systemPrompt } from './prompts';
import { AnalysisError, safeError } from './errors';

export async function analyzeIdea(idea: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL;
  if (!apiKey || !model) throw new AnalysisError('NOT_CONFIGURED', 'Live analysis is not configured yet. The site owner needs to set the Gemini key and model.', 503);
  try {
    // Server-only: neither the SDK client nor the secret is sent to the browser.
    const ai = new GoogleGenAI({ apiKey, httpOptions: { timeout: 45_000 } });
    const jsonSchema = providerSchema();

    const response = await ai.models.generateContent({
      model,
      contents: JSON.stringify({ businessIdea: idea }),
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseJsonSchema: jsonSchema,
        maxOutputTokens: 14000,
        abortSignal: AbortSignal.timeout(45_000),
        httpOptions: { retryOptions: { attempts: 1 } },
      },
    });
    if (response.candidates?.[0]?.finishReason !== 'STOP' || !response.text) {
      throw new AnalysisError('INVALID_RESPONSE', 'The AI could not return a complete analysis. Please try again.', 502);
    }
    try { return analysisSchema.parse(JSON.parse(response.text)); }
    catch { throw new AnalysisError('INVALID_RESPONSE', 'The analysis did not match the required format. Please try again.', 502); }
  } catch (error) { throw safeError(error); }
}
