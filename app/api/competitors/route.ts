import {researchCompetitors} from '@/lib/market/research';
import {confirmedMarketSchema} from '@/lib/market/schema';
import {readJson} from '@/lib/validation/readJson';
import {AnalysisError,safeError} from '@/lib/ai/errors';
export const runtime='nodejs';export const maxDuration=60;
export async function POST(request:Request){try{const parsed=confirmedMarketSchema.safeParse(await readJson(request));if(!parsed.success)throw new AnalysisError('INVALID_INPUT',parsed.error.issues[0].message,400);return Response.json(await researchCompetitors(parsed.data),{headers:{'Cache-Control':'no-store'}});}catch(e){const error=safeError(e);return Response.json({error:{code:error.code,message:error.message}},{status:error.status,headers:{'Cache-Control':'no-store'}});}}
