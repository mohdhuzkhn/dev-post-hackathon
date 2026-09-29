import { z } from 'zod';
import { analysisShape } from './schema';

// Gemini accepts a subset of JSON Schema. Keep wire schema structural;
// the full Zod schema still enforces cardinality, lengths and references locally.
export function providerSchema() {
  const source = z.toJSONSchema(analysisShape);
  const allowed = new Set(['type', 'properties', 'required', 'items', 'enum']);
  function simplify(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(simplify);
    if (!value || typeof value !== 'object') return value;
    return Object.fromEntries(Object.entries(value).filter(([key]) => allowed.has(key)).map(([key, child]) =>
      [key, key === 'properties' ? Object.fromEntries(Object.entries(child as Record<string, unknown>).map(([name, schema]) => [name, simplify(schema)])) : simplify(child)]));
  }
  return simplify(source) as Record<string, unknown>;
}
