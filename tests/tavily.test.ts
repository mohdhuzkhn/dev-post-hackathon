import assert from 'node:assert/strict';
import test from 'node:test';
import {searchTavily,mergeSources} from '../lib/market/tavily';
import {attachSources,candidatesSchema} from '../lib/market/candidates';
import {AnalysisError} from '../lib/ai/errors';
const source={title:'Tutor product',url:'https://example.com/product',content:'Offers supervised online lessons.'};
test('Tavily uses bounded basic search and does not send a generated answer',async()=>{
 let count=0;
 const mock:typeof fetch=async(url,init)=>{count++;assert.equal(url,'https://api.tavily.com/search');const body=JSON.parse(init!.body as string);assert.equal(body.query,'AI teaching tools Karachi');assert.equal(body.search_depth,'basic');assert.equal(body.auto_parameters,false);assert.equal(body.include_answer,false);assert.equal(body.max_results,6);return Response.json({results:[source,{...source,url:'javascript:alert(1)'}]});};
 assert.deepEqual(await searchTavily('AI teaching tools Karachi','test-only-key',mock),[source]);assert.equal(count,1);
});
test('missing key and oversized query never call the search service',async()=>{let count=0;const mock:typeof fetch=async()=>{count++;return Response.json({results:[]});};await assert.rejects(()=>searchTavily('query','',mock));await assert.rejects(()=>searchTavily('x'.repeat(401),'test-only-key',mock));assert.equal(count,0);});
test('provider failures are sanitized, including quota and configuration',async()=>{for(const status of [401,403,429,432,433,500]){const mock:typeof fetch=async()=>new Response('sensitive provider detail',{status});await assert.rejects(()=>searchTavily('query','test-only-key',mock),e=>e instanceof AnalysisError&&!e.message.includes('sensitive')&&e.code===([429,432,433].includes(status)?'SEARCH_QUOTA':[401,403].includes(status)?'SEARCH_CONFIGURATION':'SEARCH_UNAVAILABLE'));}});
test('no matches is distinct from malformed search data',async()=>{assert.deepEqual(await searchTavily('query','test-only-key',async()=>Response.json({results:[]})),[]);await assert.rejects(()=>searchTavily('query','test-only-key',async()=>Response.json({results:[{title:'Missing URL'}]})),e=>e instanceof AnalysisError&&e.code==='SEARCH_INVALID_RESPONSE');});
test('duplicate sources merge and invalid candidate references are discarded',()=>{
 const sources=mergeSources([[source],[{...source,url:source.url+'#lesson'}]]);assert.equal(sources.length,1);
 const candidate={name:'Tutor',product:'Teaching app',overlap:'Online instruction',marketEvidence:'Online lessons',sourceIndices:[0,0]};
 const data=candidatesSchema.parse({competitors:[candidate,{...candidate,name:'Unsupported',sourceIndices:[9]}]});const result=attachSources(data,sources);assert.equal(result.length,1);assert.deepEqual(result[0].sources,[{title:source.title,url:source.url}]);
});
