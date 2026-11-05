(()=>{'use strict';
const places=[
['London Station','london_station','The adventure begins at the station.'],
['London Streets','london_streets','Discover the streets of London.'],
['Camden Market','camden_market','Explore alternative culture and street markets.'],
['British Museum','british_museum','Explore history and cultures from around the world.'],
['Westminster & Big Ben','westminster','See Parliament and Elizabeth Tower.'],
['Buckingham Palace','buckingham_palace','Discover the royal residence.'],
['Tower Bridge','tower_bridge','Cross the famous bridge over the Thames.'],
['Tower of London','tower_of_london','Discover the fortress and the Crown Jewels.'],
['Westminster Abbey','westminster_abbey','Explore a historic Gothic abbey.'],
["St Paul's Cathedral",'st_pauls','Admire the famous dome.'],
['London Underground','london_underground','Travel across London by Tube.'],
['Traditional British Pub','british_pub','Meet a friendly local and discover pub culture.'],
['London Bookshop','london_bookshop','Discover stories in a cosy bookshop.'],
['Fish & Chips Shop','fish_and_chips','Discover a classic British dish.'],
['London Park','london_park','Enjoy the greenery and wildlife.'],
['London by Night','london_night','Watch London light up after dark.']];
const style=document.createElement('style');style.textContent=`
.london-gallery{padding:clamp(16px,3vw,44px);color:#462d20;background:linear-gradient(135deg,#fff3d4,#f7d6a2);min-height:80vh}
.london-gallery h1{color:#62341f;text-align:center;font-size:clamp(1.6rem,3vw,3rem);margin:12px 0}
.london-gallery .intro{text-align:center;color:#65452c;margin:0 auto 25px;max-width:680px}
.london-gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:18px}
.london-place{border:3px solid #bc8a50;border-radius:18px;overflow:hidden;background:#fff9e8;box-shadow:0 5px 0 #9b633a,0 12px 20px #55320e20;text-align:left;cursor:pointer;color:#3e281b;font:inherit;padding:0;transition:transform .2s}
.london-place:hover,.london-place:focus-visible{transform:translateY(-4px);outline:3px solid #447eaa}
.london-place img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}
.london-place-info{padding:12px 15px 16px}.london-place-info strong{display:block;font-size:1.1rem}.london-place-info small{display:block;margin-top:5px;color:#684d3c}
.london-viewer{position:fixed;inset:0;background:#0d1520ee;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:14px;color:white}
.london-viewer img{max-width:100%;max-height:74dvh;object-fit:contain;border:3px solid #e3b66a;border-radius:10px}
.london-viewer h2{margin:0;color:#ffe2a2}.london-viewer p{margin:0;text-align:center;color:#fff1d4}
.london-viewer button,.london-open{background:linear-gradient(#ffe4a1,#ecb454);border:2px solid #a06b32;color:#3b2618;border-radius:10px;font-weight:800;padding:10px 17px;cursor:pointer}
.london-viewer-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
@media(max-width:600px){.london-gallery-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.london-place-info{padding:9px}.london-place-info strong{font-size:.95rem}}
`;document.head.append(style);
const app=document.getElementById('app');if(!app)return;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const img=id=>'assets/london/'+id+'.webp';let active=false,previousHTML='',lastIndex=0;
function nav(){return `<header class="top"><div><div class="brand">🌍 GLOBETROTTER</div><div class="tag">LONDON EXPLORER · by BROT2YOU</div></div><nav class="nav"><button class="pill" data-london-close="1">← Back to Story</button></nav></header>`}
function show(){if(active)return;previousHTML=app.innerHTML;active=true;app.innerHTML=`<div class="app">${nav()}<main class="screen"><section class="london-gallery"><h1>🗺️ Explore London</h1><p class="intro">Discover 16 famous places and everyday experiences in London. Choose a picture to explore.</p><div class="london-gallery-grid">${places.map(([name,id,desc],i)=>`<button class="london-place" data-london-place="${i}"><img src="${img(id)}" alt="${escape(name)}" loading="lazy"><span class="london-place-info"><strong>${escape(name)}</strong><small>${escape(desc)}</small></span></button>`).join('')}</div></section></main></div>`}
function close(){if(!active)return;active=false;document.querySelector('.london-viewer')?.remove();app.innerHTML=previousHTML;previousHTML=''}
function viewer(i){lastIndex=(i+places.length)%places.length;const [name,id,desc]=places[lastIndex];document.querySelector('.london-viewer')?.remove();let el=document.createElement('div');el.className='london-viewer';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',name);el.innerHTML=`<h2>${escape(name)}</h2><img src="${img(id)}" alt="${escape(name)}"><p>${escape(desc)}</p><div class="london-viewer-actions"><button data-london-prev="1">← Previous</button><button data-london-dismiss="1">Close</button><button data-london-next="1">Next →</button></div>`;document.body.append(el);el.querySelector('[data-london-dismiss]').focus()}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.londonOpen){e.preventDefault();e.stopImmediatePropagation();show()}else if(b.dataset.londonClose){e.preventDefault();e.stopImmediatePropagation();close()}else if(b.dataset.londonPlace!==undefined){e.preventDefault();viewer(Number(b.dataset.londonPlace))}else if(b.dataset.londonDismiss){document.querySelector('.london-viewer')?.remove()}else if(b.dataset.londonNext){viewer(lastIndex+1)}else if(b.dataset.londonPrev){viewer(lastIndex-1)}} ,true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(document.querySelector('.london-viewer'))document.querySelector('.london-viewer').remove();else close()}else if(document.querySelector('.london-viewer')&&e.key==='ArrowRight')viewer(lastIndex+1);else if(document.querySelector('.london-viewer')&&e.key==='ArrowLeft')viewer(lastIndex-1)});
const obs=new MutationObserver(()=>{if(active)return;const header=app.querySelector('.top .nav');if(header&&!header.querySelector('[data-london-open]')){const b=document.createElement('button');b.className='pill';b.dataset.londonOpen='1';b.textContent='🗺️ London';header.append(b)}const side=app.querySelector('.side .sidebox');if(side&&!side.querySelector('[data-london-open]')){const b=document.createElement('button');b.className='btn';b.dataset.londonOpen='1';b.textContent='🗺️ Explore 16 London places';b.style.width='100%';b.style.marginTop='10px';side.append(b)}});obs.observe(app,{childList:true,subtree:true});
})();