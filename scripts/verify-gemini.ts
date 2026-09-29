import { GoogleGenAI } from '@google/genai';
import { providerSchema } from '../lib/ai/providerSchema';
import { analysisSchema } from '../lib/ai/schema';
import { systemPrompt } from '../lib/ai/prompts';
import { exampleIdea } from '../lib/examples';
async function main() {
 const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
 const schema=providerSchema();
 try {
 const response=await ai.models.generateContent({model:process.env.GEMINI_MODEL!,contents:JSON.stringify({businessIdea:exampleIdea}),config:{systemInstruction:systemPrompt,responseMimeType:'application/json',responseJsonSchema:schema,maxOutputTokens:14000,httpOptions:{timeout:45000,retryOptions:{attempts:1}}}});
 console.log('Finish reason:',response.candidates?.[0]?.finishReason);
 const parsed=analysisSchema.safeParse(JSON.parse(response.text||''));
 console.log('Schema valid:',parsed.success);
 if(parsed.success) console.log('Assumptions per domain:',Object.values(parsed.data.domains).map(d=>d.assumptions.length));
 else { console.log('Validation issues:',parsed.error.issues.map(i=>({path:i.path,code:i.code}))); process.exitCode=1; }
 } catch(error) {const e=error as Error & {status?:number}; console.log('SDK failure:',e.status,e.name,String(e.message).replaceAll(process.env.GEMINI_API_KEY||'__NONE__','[redacted]').slice(0,1200));process.exitCode=1;}
}
main();
