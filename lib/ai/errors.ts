export class AnalysisError extends Error {
  constructor(public code: string, message: string, public status: number) { super(message); }
}
export function safeError(error: unknown): AnalysisError {
  if (error instanceof AnalysisError) return error;
  const status = typeof error === 'object' && error !== null && 'status' in error ? Number(error.status) : 0;
  if (status === 503) return new AnalysisError('PROVIDER_UNAVAILABLE', 'Gemini is temporarily busy. Please try again shortly.', 503);
  if (status === 429) return new AnalysisError('QUOTA_EXCEEDED', 'The analysis limit has been reached. Please try again later.', 429);
  if (status === 401 || status === 403 || status === 404) return new AnalysisError('PROVIDER_CONFIGURATION', 'The AI service is not configured correctly. Please contact the site owner.', 503);
  if (error instanceof Error && /abort|timeout|timed out/i.test(error.name + ' ' + error.message)) return new AnalysisError('TIMEOUT', 'The analysis took too long. Your idea is safe in the input; please try again.', 504);
  return new AnalysisError('ANALYSIS_FAILED', 'We could not complete the analysis. Please try again.', 502);
}
