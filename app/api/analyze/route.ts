import { analyzeIdea } from '@/lib/ai/analyzeIdea';
import { AnalysisError, safeError } from '@/lib/ai/errors';
import { ideaSchema } from '@/lib/validation/idea';
export const runtime = 'nodejs';
export const maxDuration = 60;
const headers = { 'Cache-Control': 'no-store' };

export async function POST(request: Request) {
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) {
      throw new AnalysisError('INVALID_INPUT', 'Send the business idea as JSON.', 415);
    }
    const reader = request.body?.getReader();
    if (!reader) throw new AnalysisError('INVALID_INPUT', 'Please describe your business idea.', 400);
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 24000) { await reader.cancel(); throw new AnalysisError('INVALID_INPUT', 'Your request is too large.', 413); }
      chunks.push(value);
    }
    let body: unknown;
    try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { throw new AnalysisError('INVALID_INPUT', 'Please send a valid business idea.', 400); }
    const parsed = ideaSchema.safeParse(body);
    if (!parsed.success) throw new AnalysisError('INVALID_INPUT', parsed.error.issues[0].message, 400);
    return Response.json({ analysis: await analyzeIdea(parsed.data.idea) }, { headers });
  } catch (error) {
    const failure = safeError(error);
    return Response.json({ error: { code: failure.code, message: failure.message } }, { status: failure.status, headers });
  }
}
