import assert from 'node:assert/strict';
import test from 'node:test';
import { analysisSchema, domainKeys } from '../lib/ai/schema';
import { ideaSchema } from '../lib/validation/idea';
import { safeError } from '../lib/ai/errors';
const assumption = { statement:'Test assumption', whyItMatters:'Could stop delivery', impact:'high', uncertainty:'high', priorityReason:'No evidence', evidenceNeeded:'Observed customer behavior', experiment:{participants:'Volunteers',steps:['Ask permission','Measure behavior'],metric:'Observed adoption',decisionRule:'Proposed test criterion',duration:'One week',resources:'Interview time',ifSupported:'Run a pilot',ifContradicted:'Revise the idea'} };
function fixture() { return { summary:'Test-only fixture; not a live analysis.', domains:Object.fromEntries(domainKeys.map(key=>[key,{opportunity:'Hypothesis',concerns:['Unknown cost'],unknowns:['Demand'],assumptions:[structuredClone(assumption),structuredClone(assumption)]}])),priorities:[{domain:'customer',assumptionIndex:0,rationale:'Demand'},{domain:'economics',assumptionIndex:0,rationale:'Cost'},{domain:'operations',assumptionIndex:1,rationale:'Delivery'}] }; }

test('valid four-domain analysis passes',()=>assert.equal(analysisSchema.safeParse(fixture()).success,true));
test('missing domain is rejected',()=>{const data=fixture();delete data.domains.customer;assert.equal(analysisSchema.safeParse(data).success,false)});
test('one or four assumptions cannot masquerade as compliant output',()=>{for(const n of [1,4]){const data=fixture();data.domains.customer.assumptions=Array.from({length:n},()=>structuredClone(assumption));assert.equal(analysisSchema.safeParse(data).success,false)}});
test('dangling priority reference is rejected',()=>{const data=fixture();data.priorities[0].assumptionIndex=2;assert.equal(analysisSchema.safeParse(data).success,false)});
test('duplicate priorities are rejected',()=>{const data=fixture();data.priorities[1]={...data.priorities[0]};assert.equal(analysisSchema.safeParse(data).success,false)});
test('unsupported labels and empty experiment measurements fail',()=>{const data=fixture();data.domains.customer.assumptions[0].impact='certain';assert.equal(analysisSchema.safeParse(data).success,false);data.domains.customer.assumptions[0].impact='high';data.domains.customer.assumptions[0].experiment.metric=' ';assert.equal(analysisSchema.safeParse(data).success,false)});
test('input is trimmed and rejects empty, too short and oversized ideas',()=>{for(const idea of ['  ','hello','x'.repeat(4001)]) assert.equal(ideaSchema.safeParse({idea}).success,false);assert.equal(ideaSchema.parse({idea:'  A platform for online teachers to teach independently.  '}).idea.startsWith('A platform'),true)});
test('provider errors never expose raw secrets or responses',()=>{assert.equal(safeError({status:429,message:'secret'}).code,'QUOTA_EXCEEDED');assert.equal(safeError(new Error('secret')).message.includes('secret'),false);assert.equal(safeError(new DOMException('timeout','TimeoutError')).status,504)});

import { providerSchema } from '../lib/ai/providerSchema';
test('provider schema preserves fields without unsupported constraints',()=>{const schema=providerSchema();const wire=JSON.stringify(schema);assert.equal(wire.includes('minLength'),false);assert.equal(wire.includes('minItems'),false);assert.ok(wire.includes('assumptions'));assert.ok(wire.includes('decisionRule'));});
