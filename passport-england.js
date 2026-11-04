/* Optional Pixel Passport enhancement. The original game remains unchanged. */
(()=>{'use strict';
const KEY='globetrotter-reborn-v1';
const facts=[
['🏙️','Capital','London','london-station','Examine the station sign'],
['🌊','Geography','River Thames','london-station','Examine the station sign'],
['🗣️','Language','English','investigation','Accept Maya’s mission'],
['🚇','Transport','The Underground · the Tube','transport','Examine the bus stop or ask the guide'],
['🛍️','Local culture','Camden Market','camden','Examine the market stall'],
['🏛️','History & museums','The British Museum','history','Examine the museum display'],
['👑','Royal landmark','Tower of London · Crown Jewels','history','Examine the museum display']
];
const css=`
.passport-interactive{margin:20px 0 26px;padding:22px;border:3px solid #dcb66a;border-radius:19px;background:linear-gradient(145deg,#123657,#09233c);color:#f6e8c7;box-shadow:0 12px 30px #0005}
.passport-interactive h2{margin:0 0 8px;color:#ffe4a1}.passport-interactive p{margin:0 0 12px}
.passport-int-top{display:flex;align-items:center;justify-content:space-between;gap:12px}.passport-int-count{font-size:26px;font-weight:900;color:#ffe4a1}
.passport-int-bar{height:12px;background:#071b2d;border-radius:10px;overflow:hidden;margin:14px 0 18px;border:1px solid #92774e}
.passport-int-bar span{display:block;height:100%;background:linear-gradient(90deg,#b98831,#ffe4a1)}
.passport-int-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.passport-int-fact{display:flex;gap:12px;align-items:flex-start;background:#f7e5bc;color:#332c23;border:2px solid #bf934d;border-radius:12px;padding:13px;min-height:94px}
.passport-int-fact.is-locked{background:#183c59;color:#d1dce7;border-color:#476b88}
.passport-int-icon{font-size:26px;line-height:1.2}.passport-int-label{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.7px}
.passport-int-fact strong{display:block;margin:5px 0;overflow-wrap:anywhere}
.passport-int-hint{font-size:12px;opacity:.82}
.passport-int-footer{margin-top:17px;display:flex;gap:12px;align-items:center;flex-wrap:wrap}
@media(max-width:580px){.passport-interactive{padding:14px}.passport-int-grid{grid-template-columns:1fr}}
`;
const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
function render(){
 const screen=document.querySelector('#app .screen-pad');
 if(!screen||!screen.querySelector('h1')?.textContent.includes('Pixel Passport'))return;
 if(screen.querySelector('.passport-interactive'))return;
 let knowledge=[];try{const saved=JSON.parse(localStorage.getItem(KEY)||'{}');if(Array.isArray(saved.knowledge))knowledge=saved.knowledge}catch{}
 const total=facts.length,done=facts.filter(f=>knowledge.includes(f[3])).length;
 const section=document.createElement('section');section.className='passport-interactive';
 section.innerHTML=`<div class="passport-int-top"><div><h2>🏴 ENGLAND · COUNTRY IDENTITY CARD</h2><p>Discover facts while playing The Lost Passport.</p></div><div class="passport-int-count">${done}/${total}</div></div><div class="passport-int-bar" role="progressbar" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="${total}"><span style="width:${Math.round(done/total*100)}%"></span></div><div class="passport-int-grid">${facts.map(f=>{const unlocked=knowledge.includes(f[3]);return `<article class="passport-int-fact ${unlocked?'':'is-locked'}"><div class="passport-int-icon">${unlocked?f[0]:'🔒'}</div><div><div class="passport-int-label">${f[1]}</div><strong>${unlocked?f[2]:'???'}</strong><div class="passport-int-hint">${unlocked?'✓ Collected':f[4]}</div></div></article>`}).join('')}</div><div class="passport-int-footer"><button class="btn gold" data-go="adventure">🎮 Explore London →</button><span>${done===total?'🏅 England explorer!':'Your discoveries are saved automatically.'}</span></div>`;
 const heading=screen.querySelector('h1');heading.insertAdjacentElement('afterend',section);
}
const root=document.querySelector('#app');if(!root)return;
const observer=new MutationObserver(()=>{if(!root.querySelector('.passport-interactive'))render()});
observer.observe(root,{childList:true,subtree:false});
render();
})();