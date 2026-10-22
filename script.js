(()=>{
const WHATSAPP="";const MSG="Olá! Gostaria de falar com o engenheiro sobre o meu caso.";
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const btn=document.querySelector(".menu-btn"),menu=document.getElementById("menu");
btn.addEventListener("click",()=>{const o=menu.classList.toggle("open");btn.setAttribute("aria-expanded",o);btn.setAttribute("aria-label",o?"Fechar menu":"Abrir menu")});
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("open");btn.setAttribute("aria-expanded","false")}));
const ok=/^\d{10,15}$/.test(WHATSAPP);const url=ok?`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MSG)}`:null;
document.querySelectorAll(".wa").forEach(a=>{if(url){a.href=url;a.target="_blank";a.rel="noopener noreferrer"}});
const waF=document.getElementById("wa-float");if(url)waF.hidden=false;
const top=document.getElementById("to-top");
addEventListener("scroll",()=>{top.hidden=scrollY<450},{passive:true});
top.addEventListener("click",()=>scrollTo({top:0,behavior:reduce?"auto":"smooth"}));
const pages=[...document.querySelectorAll(".rev-page")],dots=[...document.querySelectorAll(".car-dots i")];let cur=0;
function show(n){cur=(n+pages.length)%pages.length;pages.forEach((p,i)=>p.hidden=i!==cur);dots.forEach((d,i)=>d.classList.toggle("on",i===cur))}
document.getElementById("next").addEventListener("click",()=>show(cur+1));
document.getElementById("prev").addEventListener("click",()=>show(cur-1));
const fmt=new Intl.NumberFormat("pt-BR");
function count(el){const end=+el.dataset.count,s=el.dataset.suffix;if(reduce||end===0){el.textContent=fmt.format(end)+s;return}
const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1600,1);el.textContent=fmt.format(Math.round(end*(1-Math.pow(1-p,3))))+s;if(p<1)requestAnimationFrame(f)})(t0)}
const io="IntersectionObserver" in window;
const cnt=document.querySelectorAll("[data-count]");
if(io){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){count(e.target);o.unobserve(e.target)}}),{threshold:.6});cnt.forEach(c=>{c.textContent="0"+c.dataset.suffix;o.observe(c)})}
const rv=document.querySelectorAll(".hero-in > *,.head-row,.svc-card,.quote-block,.about-grid>*,.plan,.rev,.why,.step,.cta .wrap>*,.center");
if(io&&!reduce){rv.forEach(el=>{el.classList.add("rv");const sib=[...el.parentElement.children].indexOf(el);el.style.setProperty("--d",Math.min(sib,6)*80+"ms")});
const o2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");o2.unobserve(e.target)}}),{threshold:.1});rv.forEach(el=>o2.observe(el))}
})();