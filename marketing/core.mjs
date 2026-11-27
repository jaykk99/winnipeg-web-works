export function validateBrief(b) {
 if(!b||typeof b!=='object')throw Error('Expected brief object');
 const out={};for(const k of ['business','industry','city','offer','audience','goal','website']){if(typeof b[k]!=='string'||!b[k].trim()||b[k].length>500)throw Error('Invalid '+k);out[k]=b[k].trim();}
 const u=new URL(out.website);if(!['http:','https:'].includes(u.protocol)||u.username||u.password)throw Error('Invalid website');out.website=u.href;
 out.facts=Array.isArray(b.facts)?b.facts.slice(0,20).map(s=>{if(typeof s!=='string'||s.length>500)throw Error('Invalid fact');return s;}):[];return out;
}
export function trackedLink(website,channel,campaign){const u=new URL(website);u.searchParams.set('utm_source',channel);u.searchParams.set('utm_medium',channel==='google_ads'?'cpc':'organic');u.searchParams.set('utm_campaign',campaign);return u.href;}
export function validatePlan(p,b){
 const clean=(s,max)=>{if(typeof s!=='string'||!s.trim()||[...s].length>max)throw Error('Invalid copy: limit '+max);return s.trim();};
 const exact=(xs,n)=>{if(!Array.isArray(xs)||xs.length!==n)throw Error('Expected '+n+' items');return xs;};
 const slug=b.business.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60)||'campaign';
 const posts=exact(p.posts,7).map((x,i)=>{if(!['facebook','instagram','linkedin','google_business'].includes(x.channel))throw Error('Invalid channel');return {day:i+1,channel:x.channel,copy:clean(x.copy,900),link:trackedLink(b.website,x.channel,slug),state:'draft'};});
 return {business:b.business,goal:b.goal,source:'model',status:'draft_only',posts,seoTopics:exact(p.seoTopics,3).map(s=>clean(s,120)),landingCopy:clean(p.landingCopy,1800),proposal:clean(p.proposal,2000),paidSearch:{enabled:false,budgetCAD:0,headlines:exact(p.headlines,5).map(s=>clean(s,30)),descriptions:exact(p.descriptions,3).map(s=>clean(s,90)),link:trackedLink(b.website,'google_ads',slug)}};
}
export function summarizeMetrics(rows){
 if(!Array.isArray(rows))throw Error('Expected metrics array');
 const groups=new Map();for(const row of rows){if(!row||typeof row.channel!=='string'||!row.channel.trim())throw Error('Invalid channel');const g=groups.get(row.channel)||{channel:row.channel,impressions:0,clicks:0,leads:0,spendCAD:0};for(const k of ['impressions','clicks','leads','spendCAD']){if(typeof row[k]!=='number'||!Number.isFinite(row[k])||row[k]<0||(k!=='spendCAD'&&!Number.isInteger(row[k])))throw Error('Invalid metric '+k);g[k]+=row[k];}if(row.clicks>row.impressions)throw Error('Clicks exceed impressions');groups.set(row.channel,g);}
 return [...groups.values()].map(g=>({...g,ctr:g.impressions?g.clicks/g.impressions:null,costPerLeadCAD:g.leads?g.spendCAD/g.leads:null,action:g.clicks<30?'collect more data':g.leads===0?'review offer and landing page':'compare lead quality and cost before scaling'}));
}