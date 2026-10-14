import {z} from 'zod';
const text=z.string().trim().min(1).max(1800);
export function safeWebUrl(value:string) {
 try {const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&!u.hostname.startsWith('[')&&!u.hostname.endsWith('.localhost')&&!['localhost','127.0.0.1','::1'].includes(u.hostname)&&!/^\d+\.\d+\.\d+\.\d+$/.test(u.hostname);} catch {return false;}
}
export const sourceSchema=z.object({title:text,url:z.string().refine(safeWebUrl,'Invalid source URL')}).strict();
export const researchSchema=z.object({status:z.enum(['found','no_matches','unavailable']),message:text,checkedAt:z.string(),location:text,competitors:z.array(z.object({name:text,product:text,overlap:text,marketEvidence:text,sources:z.array(sourceSchema).min(1).max(5)}).strict()).max(6),searchSuggestions:z.string().max(30000)}).strict().superRefine((v,c)=>{if((v.status==='found')!==(v.competitors.length>0))c.addIssue({code:'custom',message:'Research status must match supported competitors'});});
export type Research=z.infer<typeof researchSchema>;
