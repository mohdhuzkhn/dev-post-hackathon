import {z} from 'zod';
import {type SearchSource} from './tavily';
const text=z.string().trim().min(1).max(1800);
export const candidatesSchema=z.object({competitors:z.array(z.object({name:text,product:text,overlap:text,marketEvidence:text,sourceIndices:z.array(z.number().int().min(0)).min(1).max(5)}).strict()).max(6)}).strict();
export function attachSources(candidates:z.infer<typeof candidatesSchema>,sources:SearchSource[]){
 return candidates.competitors.flatMap(candidate=>{
  if(candidate.sourceIndices.some(index=>!sources[index]))return [];
  return [{name:candidate.name,product:candidate.product,overlap:candidate.overlap,marketEvidence:candidate.marketEvidence,sources:[...new Set(candidate.sourceIndices)].map(index=>({title:sources[index].title,url:sources[index].url}))}];
 });
}
