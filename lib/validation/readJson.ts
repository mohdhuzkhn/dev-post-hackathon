import {AnalysisError} from '../ai/errors';
export async function readJson(request:Request){
 if(!request.headers.get('content-type')?.includes('application/json'))throw new AnalysisError('INVALID_INPUT','Send your idea as JSON.',415);
 const reader=request.body?.getReader();if(!reader)throw new AnalysisError('INVALID_INPUT','Enter your business idea.',400);
 const chunks:Uint8Array[]=[];let bytes=0;
 while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>24000){await reader.cancel();throw new AnalysisError('INVALID_INPUT','Your request is too large.',413);}chunks.push(value);}
 try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new AnalysisError('INVALID_INPUT','Send valid JSON.',400);}
}
