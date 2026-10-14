import {z} from 'zod';
import {AnalysisError} from '../ai/errors';
import {safeWebUrl} from './researchSchema';

export type SearchSource={title:string;url:string;content:string};
const searchResponse=z.object({results:z.array(z.object({title:z.string().max(1800),url:z.string().max(4000),content:z.string().max(30000)})).max(20)});

// No key is read at module scope. The server passes the credential explicitly.
export async function searchTavily(query:string,apiKey:string,fetcher:typeof fetch=fetch):Promise<SearchSource[]>{
 if(!apiKey.trim())throw new AnalysisError('SEARCH_NOT_CONFIGURED','The site owner needs to configure the Tavily search key.',503);
 if(!query.trim()||query.length>400)throw new AnalysisError('INVALID_QUERY','The search query was not usable. Please retry research.',502);
 let response:Response;
 try{response=await fetcher('https://api.tavily.com/search',{method:'POST',headers:{Authorization:'Bearer '+apiKey,'Content-Type':'application/json'},body:JSON.stringify({query,search_depth:'basic',max_results:6,topic:'general',include_answer:false,include_raw_content:false,include_images:false,auto_parameters:false}),signal:AbortSignal.timeout(12000)});}catch{throw new AnalysisError('SEARCH_UNAVAILABLE','Web search could not be reached. Your analysis is preserved; retry research shortly.',503);}
 if(!response.ok){
  if([429,432,433].includes(response.status))throw new AnalysisError('SEARCH_QUOTA','The web-search limit has been reached. Your analysis is preserved.',429);
  if([401,403].includes(response.status))throw new AnalysisError('SEARCH_CONFIGURATION','The Tavily search key is missing, invalid or restricted. Please contact the site owner.',503);
  throw new AnalysisError('SEARCH_UNAVAILABLE','The web-search provider is temporarily unavailable. Your analysis is preserved.',503);
 }
 try{
  const parsed=searchResponse.parse(await response.json());
  return parsed.results.filter(s=>safeWebUrl(s.url)).map(s=>({title:s.title||new URL(s.url).hostname,url:s.url,content:s.content.slice(0,3500)}));
 }catch{throw new AnalysisError('SEARCH_INVALID_RESPONSE','Web search returned unusable source data. Please retry research.',502);}
}

export function mergeSources(groups:SearchSource[][]){
 const seen=new Set<string>();
 return groups.flat().filter(source=>{const u=new URL(source.url);u.hash='';const key=u.toString();if(seen.has(key))return false;seen.add(key);return true;}).slice(0,12);
}
